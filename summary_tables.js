const summaryTablesData = [
    {
        "id":  "apgar",
        "subtitle":  "Αξιολόγηση στο 1ο και 5ο λεπτό της ζωής. Σκορ \u003e= 7: Φυσιολογικό. 4-6: Ήπια κατάσταση. \u003c= 3: Επείγουσα αναζωογόνηση.",
        "headers":  [
                        "Σημείο",
                        "0 Βαθμοί",
                        "1 Βαθμός",
                        "2 Βαθμοί"
                    ],
        "title":  "Σκορ APGAR Νεογνού",
        "htmlContent":  "",
        "type":  "table",
        "rows":  [
                     [
                         "Appearance (Χρώμα)",
                         "Μπλε, ωχρό παντού",
                         "Ροζ κορμός, μπλε άκρα (ακροκυάνωση)",
                         "Ροζ παντού"
                     ],
                     [
                         "Pulse (Σφυγμοί)",
                         "Απόντες",
                         "\u003c 100 / λεπτό",
                         "\u003e= 100 / λεπτό"
                     ],
                     [
                         "Grimace (Αντανάκλαση)",
                         "Καμία ανταπόκριση",
                         "Μορφασμός κατά την αναρρόφηση",
                         "Φτάρνισμα, βήχας, κλάμα"
                     ],
                     [
                         "Activity (Τόνος)",
                         "Χαλαρός, πλαδαρός",
                         "Ήπια κάμψη των άκρων",
                         "Ενεργητική κίνηση, ζωηρή κάμψη"
                     ],
                     [
                         "Respiration (Αναπνοή)",
                         "Απούσα",
                         "Ασθενής, ακανόνιστη, κλάμα σιγανό",
                         "Ισχυρή αναπνοή, δυνατό κλάμα"
                     ]
                 ]
    },
    {
        "id":  "fluids",
        "subtitle":  "Υπολογισμός των ημερήσιων και ωριαίων αναγκών σε υγρά συντήρησης για παιδιατρικούς ασθενείς με βάση το σωματικό βάρος.",
        "headers":  [

                    ],
        "title":  "Ενδοφλέβια Υγρά Συντήρησης (Holiday-Segar)",
        "htmlContent":  "\u003cdiv class=\"fluids-grid\" style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px;\"\u003e\r\n    \u003cdiv class=\"fluid-card\" style=\"background: rgba(255,255,255,0.02); padding: 16px; border-radius: 12px; border: 1px solid var(--card-border);\"\u003e\r\n        \u003ch4 style=\"margin-bottom: 12px; color: var(--accent-color);\"\u003eΜέθοδος 24 ωρών (Ημερήσιες Ανάγκες)\u003c/h4\u003e\r\n        \u003cul style=\"list-style: none; padding: 0;\"\u003e\r\n            \u003cli style=\"margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);\"\u003e\r\n                \u003cstrong\u003eΓια τα πρώτα 10 kg βάρος:\u003c/strong\u003e\u003cbr\u003e\r\n                \u003cspan style=\"color: var(--success-color);\"\u003e100 mL / kg / ημέρα\u003c/span\u003e\r\n            \u003c/li\u003e\r\n            \u003cli style=\"margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);\"\u003e\r\n                \u003cstrong\u003eΓια τα επόμενα 10 kg (11-20 kg):\u003c/strong\u003e\u003cbr\u003e\r\n                \u003cspan style=\"color: var(--success-color);\"\u003e1000 mL + 50 mL / kg\u003c/span\u003e για κάθε kg πάνω από 10\r\n            \u003c/li\u003e\r\n            \u003cli style=\"margin-bottom: 8px;\"\u003e\r\n                \u003cstrong\u003eΓια βάρος άνω των 20 kg:\u003c/strong\u003e\u003cbr\u003e\r\n                \u003cspan style=\"color: var(--success-color);\"\u003e1500 mL + 20 mL / kg\u003c/span\u003e για κάθε kg πάνω από 20\r\n            \u003c/li\u003e\r\n        \u003c/ul\u003e\r\n    \u003c/div\u003e\r\n    \u003cdiv class=\"fluid-card\" style=\"background: rgba(255,255,255,0.02); padding: 16px; border-radius: 12px; border: 1px solid var(--card-border);\"\u003e\r\n        \u003ch4 style=\"margin-bottom: 12px; color: var(--accent-color);\"\u003eΜέθοδος Ωριαίας Ροής (Κανόνας 4-2-1)\u003c/h4\u003e\r\n        \u003cul style=\"list-style: none; padding: 0;\"\u003e\r\n            \u003cli style=\"margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);\"\u003e\r\n                \u003cstrong\u003eΓια τα πρώτα 10 kg βάρος:\u003c/strong\u003e\u003cbr\u003e\r\n                \u003cspan style=\"color: var(--primary-color);\"\u003e4 mL / kg / ώρα\u003c/span\u003e\r\n            \u003c/li\u003e\r\n            \u003cli style=\"margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);\"\u003e\r\n                \u003cstrong\u003eΓια τα επόμενα 10 kg (11-20 kg):\u003c/strong\u003e\u003cbr\u003e\r\n                \u003cspan style=\"color: var(--primary-color);\"\u003e40 mL / ώρα + 2 mL / kg\u003c/span\u003e για κάθε kg πάνω από 10\r\n            \u003c/li\u003e\r\n            \u003cli style=\"margin-bottom: 8px;\"\u003e\r\n                \u003cstrong\u003eΓια βάρος άνω των 20 kg:\u003c/strong\u003e\u003cbr\u003e\r\n                \u003cspan style=\"color: var(--primary-color);\"\u003e60 mL / ώρα + 1 mL / kg\u003c/span\u003e για κάθε kg πάνω από 20\r\n            \u003c/li\u003e\r\n        \u003c/ul\u003e\r\n    \u003c/div\u003e\r\n\u003c/div\u003e\r\n\u003cdiv class=\"example-box\" style=\"margin-top: 20px; background: rgba(99,102,241,0.05); border-left: 4px solid var(--primary-color); padding: 12px 16px; border-radius: 4px;\"\u003e\r\n    \u003cp style=\"margin: 0; font-size: 0.95rem; line-height: 1.5;\"\u003e\r\n        \u003cstrong\u003eΠαράδειγμα για παιδί 24 kg:\u003c/strong\u003e\u003cbr\u003e\r\n        \u0026bull; \u003cstrong\u003eΗμερήσια:\u003c/strong\u003e 1000 mL + 500 mL + (4kg \u0026times; 20 mL) = 1500 + 80 = \u003cstrong\u003e1580 mL / ημέρα\u003c/strong\u003e.\u003cbr\u003e\r\n        \u0026bull; \u003cstrong\u003eΩριαία (4-2-1):\u003c/strong\u003e 40 mL/h + 20 mL/h + (4kg \u0026times; 1 mL/h) = 60 + 4 = \u003cstrong\u003e64 mL / ώρα\u003c/strong\u003e.\r\n    \u003c/p\u003e\r\n\u003c/div\u003e",
        "type":  "html",
        "rows":  [

                 ]
    }
];
