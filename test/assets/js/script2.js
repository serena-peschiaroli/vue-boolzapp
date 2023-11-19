const { createApp } = Vue;
const dt = luxon.DateTime;
console.log(dt.now().setLocale('it').toLocaleString(dt.DATETIME_FULL_WITH_SECONDS));

createApp({
    data() {
        return {
            activeIndex: 0, 
            searchText: "",
            filteredContacts: [],
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                },
            ],
            newMessageText: '',
        };
    },
    computed: {
        // Lista dei contatti filtrati in base al testo di ricerca
        filteredContactsList() {
            //Filtra i messaggi del contatto cercando quelli con lo status "received".
            const filtered = this.contacts.filter(contact =>
                contact.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
            return filtered;
        },
    },
    methods: {
        getLastReceivedMessage(contact) {
            // Ottiene l'ultimo messaggio ricevuto per il contatto specificato
            //Utilizza il metodo getLastReceivedMessage per ottenere l'oggetto dell'ultimo messaggio 
            
            const receivedMessages = contact.messages.filter(message => message.status === 'received');
            
            return receivedMessages.length > 0 ? receivedMessages[receivedMessages.length - 1] : null;
        },
        
        getLastReceivedMessageTime(contact) {
            const lastReceivedMessage = this.getLastReceivedMessage(contact);
            return lastReceivedMessage ? lastReceivedMessage.date : '';
        },
        
        getLastReceivedMessageText(contact) {
            const lastReceivedMessage = this.getLastReceivedMessage(contact);
            return lastReceivedMessage ? lastReceivedMessage.message : '';
        },
        
        showConversation(contact) {

            /*'indice attivo per visualizzare la conversazione con un contatto specificato.
L'indice attivo viene utilizzato per determinare quale conversazione è attualmente aperta.*/
            this.activeIndex = this.contacts.indexOf(contact);
        },
    
        
       

        getCombinedMessages() {
            if (this.activeIndex === null || this.activeIndex >= this.contacts.length) return [];
            const allMessages = [...this.contacts[this.activeIndex].messages];
            return allMessages.sort((a, b) => new Date(a.date) - new Date(b.date));
        },
        

        sendMessage(text) {
            const trimmedMsg = text.trim();
        
            
            if (trimmedMsg !== "") {
                const newMessage = {
                    date: new Date().toLocaleString(),
                    message: text,
                    status: 'sent',
                };
        
                if (this.activeIndex !== null && this.activeIndex < this.contacts.length) {
                    
                    this.contacts[this.activeIndex].messages.push(newMessage);
                    this.newMessageText = ""; // Clear the input
        
                    // Simulate a response after a delay
                    setTimeout(() => {
                        const responseMsg = {
                            date: new Date().toLocaleString(),
                            message: 'Okay!',
                            status: 'received',
                        };
                        this.contacts[this.activeIndex].messages.push(responseMsg);
                    }, 1000);
                } else {
                    console.error('indice invalido', this.activeIndex);
                }
            }
        },
        

        deleteMessage(message) {
            const index = this.contacts[this.activeIndex].messages.indexOf(message);
            if (index !== -1) {
                this.contacts[this.activeIndex].messages.splice(index, 1);
            }
        },

        showMessageInfo() {
            if (this.activeIndex !== null && this.activeIndex < this.contacts.length) {
                const lastReceivedMessage = this.getLastReceivedMessage(this.contacts[this.activeIndex]);
                const infoMessage = `Ultimo messaggio ricevuto: ${lastReceivedMessage ? lastReceivedMessage.message : 'No messages'}\nDate: ${this.getLastReceivedMessageTime(this.contacts[this.activeIndex])}`;
                alert(infoMessage);
            }
        },
        searchContacts() {
            console.log('Search Contact iniziato');
            console.log('Search Text:', this.searchText);
            console.log('Contacts:', this.contacts);
        
            if (!this.searchText) {
                this.filteredContacts = this.contacts;
            } else {
                this.filteredContacts = this.contacts.filter(contact =>
                    contact.name.toLowerCase().includes(this.searchText.toLowerCase())
                );
            }
        
            console.log('filtrati:', this.filteredContacts);
        },
        
        
        
    },
}).mount("#app");
