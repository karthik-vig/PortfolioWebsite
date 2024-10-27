const ProjectData = [
    {
        projectName: "Personal Finance App",
        technologyStack: [
                            "Javascript", 
                            "NodeJS", 
                            "ReactJS", 
                            "ElectronJS", 
                            "Electron-forge", 
                            "SQLite", 
                            "HTML", 
                            "CSS", 
                            "TailwindCSS", 
                            "Vite",
                        ],
        links: {
            github: "https://github.com/karthik-vig/PersonalFinanceApp",
        },
        description: "Implemented a robust financial transaction tracking system that is intuitive and easy to use. It has the ability to track recurring transactions. Transactions are only allowed between pre-registered financial entities, allowing for greater detail and precision. The analytics page helps the user grasp at a glance their current financial state.",
        imageName: "personalFinanceApp.webp"
    },
    {
        projectName: "Job Application Tracker",
        technologyStack: [
                            "Python", 
                            "Flask", 
                            "SQLAlchemy", 
                            "SQLite", 
                            "Webview",
                        ],
        links: {
            github: "https://github.com/karthik-vig/job-application-tracker",
        },
        description: "Designed an application to effectively track job applications. Manages comprehensive details for each application, including resume, cover letter, additional files, location, position name, company, and application status. Has a robust search with filters to find the necessasry job application information easily.",
        imageName: "jobApplicationTracker.webp"
    },
    {
        projectName: "Password Manager",
        technologyStack: [
                            "Python", 
                            "CustomTkinter", 
                            "Cryptography", 
                            "SQLAlchemy", 
                            "SQLite",
                        ],
        links: {
            github: "https://github.com/karthik-vig/password-manager",
        },
        description: "An application to store password and it's related information securely using AES encryption on local disk. It's features include the ability to search entries and sync up with another database using the same format and encryption password.",
        imageName: "passwordManager.webp"
    },
    {
        projectName: "Error Focus TransE: Enhanced Training Through Error Prioritization",
        technologyStack: [
                            "Python", 
                            "PyTorch", 
                            "Matplotlib"
                        ],
        links: {
            github: "https://github.com/karthik-vig/Error-Aware-Self-Optimize-Corrupt-Triplet-Sampling-for-KGE-models",
        },
        description: "TransE is a KGE (Knowledge graph embedding) model. I have optimized it's corrupt sample sampling technique to boots it's Hits@10 metric within fewer epochs. Achieved an average rate improvement in Hits@10 by 0.003 between epochs 20-40, outperforming the baseline’s 0.002 rate.",
        imageName: "errorFocusTransE.webp"
    },
    {
        projectName: "Cellular Decipher: For Malignant Cell Imaging",
        technologyStack: [
                            "Python", 
                            "PyTorch", 
                            "Matplotlib", 
                            "Scikit-Learn"
                        ],
        links: {
            github: "https://github.com/karthik-vig/Autoencoder-based-classification",
        },
        description: "Crafted an Autoencoder for cellular image reconstruction and integrated the encoder with a neural network for latent vector labeling. Hyperparameter tuning reduced training epochs for image reconstruction from 20 to 10.  Replaced an 8-layer CNN with a 5-layer encoder-neural network, achieving a signicant decrease in training time from an average of 27 minutes to 15 minutes while maintaining or enhancing classication performance.  Successfully classied malignant cells with 91% accuracy while minimizing false negatives. Demonstrated the viability of decoupled neural architectures in reducing training complexity and time in image classication tasks.",
        imageName: "cellularDecipher.webp"
    },
    {
        projectName: "Deep Morph Digits: Unsupervised clustering in latent space",
        technologyStack: [
                            "Python", 
                            "PyTorch", 
                            "Matplotlib", 
                            "Scikit-Learn"
                        ],
        links: {
            github: "https://github.com/karthik-vig/autoencoder-based-unsupervised-learning",
        },
        description: "Leveraged Variational Autoencoder (VAE) to transform MNIST digit images into latent vectors, subsequently employing K-means & Hierarchical clustering for unsupervised learning, yielding a Silhouette Score of 0.3.  Attained 70% accuracy in grouping similar digits together through unsupervised methods. Tackled initial overlapping clusters by optimizing the latent space representation through hyperparameter tuning.",
        imageName: "deepMorphDigits.webp"
    }
];

export default ProjectData;