document.addEventListener('DOMContentLoaded', () => {
    // Check if database is loaded
    if (typeof gameTablesData === 'undefined') {
        console.error("gameTablesData not found. Make sure game_tables.js is loaded first.");
        return;
    }

    // State Variables
    let activeGame = null;
    let placedItems = {}; // maps zoneId -> placedText
    let selectedCard = null; // { text, element }
    let attemptsCount = 0;
    let isGameCompleted = false;

    // DOM Elements
    const chapterSelect = document.getElementById('game-chapter-select');
    const tableSelect = document.getElementById('game-table-select');
    const tableTitle = document.getElementById('game-table-title');
    const tableThead = document.getElementById('game-table-thead');
    const tableTbody = document.getElementById('game-table-tbody');
    const pathophysiologyText = document.getElementById('pathophysiology-text');
    const itemsPool = document.getElementById('game-items-pool');
    
    const feedbackMessage = document.getElementById('game-feedback-message');
    const attemptsBadge = document.getElementById('attempts-badge');
    const resetBtn = document.getElementById('reset-game-btn');
    const solutionBtn = document.getElementById('solution-game-btn');
    const checkBtn = document.getElementById('check-game-btn');
    const analysisPanel = document.getElementById('game-analysis-panel');
    const analysisText = document.getElementById('game-analysis-text');

    // 1. Populate Chapter Selection
    function initChapters() {
        const chapters = new Set();
        gameTablesData.forEach(game => {
            if (game.chapter) chapters.add(game.chapter);
        });

        chapterSelect.innerHTML = '';
        Array.from(chapters).forEach(ch => {
            const opt = document.createElement('option');
            opt.value = ch;
            opt.textContent = ch;
            chapterSelect.appendChild(opt);
        });

        // Trigger first loading
        if (chapterSelect.options.length > 0) {
            onChapterChange(chapterSelect.value);
        }
    }

    // 2. Handle Chapter Dropdown Change
    function onChapterChange(chapterName) {
        const filteredGames = gameTablesData.filter(g => g.chapter === chapterName);
        tableSelect.innerHTML = '';
        
        filteredGames.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.id;
            opt.textContent = g.title;
            tableSelect.appendChild(opt);
        });

        if (tableSelect.options.length > 0) {
            loadGame(tableSelect.value);
        }
    }

    // 3. Shuffle Array helper
    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // 4. Load & Build Game Workspace
    function loadGame(gameId) {
        const game = gameTablesData.find(g => g.id === gameId);
        if (!game) return;

        activeGame = game;
        placedItems = {};
        selectedCard = null;
        attemptsCount = 0;
        isGameCompleted = false;

        // Reset UI Buttons
        attemptsBadge.textContent = "Προσπάθειες: 0";
        feedbackMessage.textContent = "Έτοιμοι για παιχνίδι! Τοποθετήστε όλα τα στοιχεία.";
        feedbackMessage.style.color = "var(--text-secondary)";
        
        solutionBtn.disabled = true;
        solutionBtn.classList.add('disabled');
        solutionBtn.textContent = "Εμφάνιση Λύσης (0/5)";
        
        analysisPanel.classList.add('hidden');
        analysisText.textContent = '';

        // Update pathophysiology sidebar
        pathophysiologyText.textContent = game.pathophysiology || "Δεν υπάρχει διαθέσιμη περιγραφή παθοφυσιολογίας.";
        tableTitle.textContent = game.title;

        // Render Table Headers
        tableThead.innerHTML = '';
        const headerRow = document.createElement('tr');
        game.headers.forEach(h => {
            const th = document.createElement('th');
            th.textContent = h;
            headerRow.appendChild(th);
        });
        tableThead.appendChild(headerRow);

        // Render Table Rows (static text cells & dropzones)
        tableTbody.innerHTML = '';
        game.rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                if (cell.type === 'text') {
                    td.textContent = cell.content;
                    td.style.fontWeight = '600';
                    td.style.background = 'rgba(255,255,255,0.01)';
                } else if (cell.type === 'zone') {
                    const zone = document.createElement('div');
                    zone.className = 'game-cell-dropzone';
                    zone.setAttribute('data-zone-id', cell.id);
                    zone.innerHTML = `<span class="zone-placeholder">Κάντε κλικ για τοποθέτηση</span>`;
                    
                    zone.addEventListener('click', () => handleZoneClick(cell.id, zone));
                    td.appendChild(zone);
                }
                tr.appendChild(td);
            });
            tableTbody.appendChild(tr);
        });

        // Collect and Shuffle items (Correct answers + Distractors)
        const correctAnswers = [];
        game.rows.forEach(row => {
            row.forEach(cell => {
                if (cell.type === 'zone') {
                    correctAnswers.push(cell.expected);
                }
            });
        });

        const allItems = [...correctAnswers, ...game.distractors];
        shuffleArray(allItems);

        // Render Pool items
        itemsPool.innerHTML = '';
        allItems.forEach((itemText, idx) => {
            const card = document.createElement('div');
            card.className = 'game-pool-card';
            card.textContent = itemText;
            card.setAttribute('data-card-id', 'card_' + idx);
            card.addEventListener('click', () => handleCardClick(itemText, card));
            itemsPool.appendChild(card);
        });
    }

    // 5. Handle Card selection from the pool
    function handleCardClick(text, element) {
        if (isGameCompleted) return;

        // If card is already placed elsewhere, do nothing on click
        if (element.classList.contains('placed-hidden')) return;

        // If clicked on the currently selected card, deselect it
        if (selectedCard && selectedCard.element === element) {
            element.classList.remove('selected-card-highlight');
            selectedCard = null;
            return;
        }

        // Deselect previous selection
        if (selectedCard) {
            selectedCard.element.classList.remove('selected-card-highlight');
        }

        // Select new card
        selectedCard = { text, element };
        element.classList.add('selected-card-highlight');
    }

    // 6. Handle Target Zone Clicks in the Table Grid
    function handleZoneClick(zoneId, zoneElement) {
        if (isGameCompleted) return;

        // Case A: Placing a selected card into the zone
        if (selectedCard) {
            // If something is already in this cell, return it to the pool
            if (placedItems[zoneId]) {
                const prevText = placedItems[zoneId];
                returnCardToPool(prevText);
            }

            // Put the selected card text in the zone
            placedItems[zoneId] = selectedCard.text;
            zoneElement.innerHTML = `<div class="game-placed-card-inner">${selectedCard.text}</div>`;
            zoneElement.classList.add('has-item');
            zoneElement.classList.remove('error-highlight');

            // Hide the selected card in the pool
            selectedCard.element.classList.add('placed-hidden');
            selectedCard.element.classList.remove('selected-card-highlight');

            // Reset selection state
            selectedCard = null;
        } 
        // Case B: Removing an already placed card from the zone
        else if (placedItems[zoneId]) {
            const prevText = placedItems[zoneId];
            returnCardToPool(prevText);

            // Clear the zone UI
            delete placedItems[zoneId];
            zoneElement.innerHTML = `<span class="zone-placeholder">Κάντε κλικ για τοποθέτηση</span>`;
            zoneElement.classList.remove('has-item');
            zoneElement.classList.remove('error-highlight');
        }
    }

    // Helper to return a card back to pool (unhide it)
    function returnCardToPool(text) {
        const cards = itemsPool.querySelectorAll('.game-pool-card');
        for (let card of cards) {
            if (card.textContent === text && card.classList.contains('placed-hidden')) {
                card.classList.remove('placed-hidden');
                break;
            }
        }
    }

    // 7. Validate answers
    function checkAnswers() {
        if (isGameCompleted) return;

        // Count expected zones
        let totalZones = 0;
        let filledZones = 0;
        activeGame.rows.forEach(row => {
            row.forEach(cell => {
                if (cell.type === 'zone') {
                    totalZones++;
                    if (placedItems[cell.id]) {
                        filledZones++;
                    }
                }
            });
        });

        // Ensure everything is filled
        if (filledZones < totalZones) {
            feedbackMessage.textContent = `📝 Παρακαλώ συμπληρώστε όλα τα κελιά (${filledZones}/${totalZones}) προτού κάνετε έλεγχο!`;
            feedbackMessage.style.color = "#f59e0b"; // Orange/Amber
            return;
        }

        // Validate each cell
        let errorsCount = 0;
        activeGame.rows.forEach(row => {
            row.forEach(cell => {
                if (cell.type === 'zone') {
                    const zoneEl = document.querySelector(`[data-zone-id="${cell.id}"]`);
                    if (placedItems[cell.id] === cell.expected) {
                        zoneEl.classList.remove('error-highlight');
                        zoneEl.classList.add('correct-highlight');
                    } else {
                        zoneEl.classList.remove('correct-highlight');
                        zoneEl.classList.add('error-highlight');
                        errorsCount++;
                    }
                }
            });
        });

        if (errorsCount === 0) {
            // Success State!
            isGameCompleted = true;
            feedbackMessage.textContent = "🎉 Όλες οι απαντήσεις είναι σωστές! Συγχαρητήρια!";
            feedbackMessage.style.color = "var(--success-color)";
            
            // Render all placed cards as locked green
            const zoneElements = tableTbody.querySelectorAll('.game-cell-dropzone');
            zoneElements.forEach(z => z.classList.add('locked-success'));

            // Reveal final clinical analysis
            analysisPanel.classList.remove('hidden');
            analysisText.textContent = activeGame.fullExplanation;
            analysisPanel.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Error State
            attemptsCount++;
            attemptsBadge.textContent = `Προσπάθειες: ${attemptsCount}`;
            feedbackMessage.textContent = `❌ Λάθος! Έχετε ${errorsCount} λανθασμένες τοποθετήσεις. Δοκιμάστε ξανά.`;
            feedbackMessage.style.color = "#ef4444"; // Red

            // Enable solution button after 5 attempts
            if (attemptsCount >= 5) {
                solutionBtn.disabled = false;
                solutionBtn.classList.remove('disabled');
                solutionBtn.textContent = "Εμφάνιση Λύσης";
            } else {
                solutionBtn.textContent = `Εμφάνιση Λύσης (${attemptsCount}/5)`;
            }
        }
    }

    // 8. Auto-populate Solution
    function revealSolution() {
        if (!activeGame || isGameCompleted) return;

        activeGame.rows.forEach(row => {
            row.forEach(cell => {
                if (cell.type === 'zone') {
                    placedItems[cell.id] = cell.expected;
                    const zoneEl = document.querySelector(`[data-zone-id="${cell.id}"]`);
                    zoneEl.innerHTML = `<div class="game-placed-card-inner">${cell.expected}</div>`;
                    zoneEl.classList.add('has-item', 'correct-highlight', 'locked-success');
                    zoneEl.classList.remove('error-highlight');
                }
            });
        });

        // Hide all pool cards
        const cards = itemsPool.querySelectorAll('.game-pool-card');
        cards.forEach(c => c.classList.add('placed-hidden'));

        isGameCompleted = true;
        feedbackMessage.textContent = "💡 Αποκάλυψη Σωστής Λύσης.";
        feedbackMessage.style.color = "#ea580c"; // Dark Orange

        // Show clinical analysis
        analysisPanel.classList.remove('hidden');
        analysisText.textContent = activeGame.fullExplanation;
        analysisPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // Event Listeners
    chapterSelect.addEventListener('change', (e) => onChapterChange(e.target.value));
    tableSelect.addEventListener('change', (e) => loadGame(e.target.value));
    checkBtn.addEventListener('click', checkAnswers);
    resetBtn.addEventListener('click', () => loadGame(tableSelect.value));
    solutionBtn.addEventListener('click', revealSolution);

    // Initial Trigger
    initChapters();
});
