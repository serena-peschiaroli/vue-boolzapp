const { createApp } = Vue;
const dt = luxon.DateTime;
console.log(dt.now().setLocale('it').toLocaleString(dt.DATETIME_FULL_WITH_SECONDS));

createApp ({
    data(){
        return{
            activeContact : null,
            searchText: '',
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
    methods: {
        getLastReceivedMessageText(contact) {
            //funione che usa gestLastReceivedMessage come helper, richiamala funzione per prendere l'ultimo msg con status 'received' passando contact come argomento;
            
            const lastReceivedMessage = this.getLastReceivedMessage(contact);
            //this.getLastReceivedMessage viene inserita nella variabile getLastReceivedMessage, che continene l'oggetto relativo
            // operatore ternario che controlla se lastrecevedmessage non sia né null né undefined e ritorna lastreceivedmsg
            console.log(lastReceivedMessage);
            return lastReceivedMessage ? lastReceivedMessage.message : '';
        },
        getLastReceivedMessage(contact){
            // funzione "helper method" .> per poter recuperare il messaggio e l'orario 
            const receivedMessages = contact.messages.filter(message => message.status === 'received');
            //prende l'obj contact come argomento e ritortna l'ultimo msg per quel contatto; filtra i messaggio per includere SOLO quelli con status 'received
            return receivedMessages.length > 0 ? receivedMessages[receivedMessages.length - 1] : null;
            //ritorna l'ultimo messaggio con status 'received' (length-1);

        },
        getLastReceivedMessageTime(contact){
            const lastReceivedMessage = this.getLastReceivedMessage(contact);
            return lastReceivedMessage ? lastReceivedMessage.date : '';
            console.log(lastReceivedMessage.date);
        },
        showConversation(contact) {
            this.activeContact = contact;
        },
        getCombinedMessages(){
            //controlla se c'è un contatto attivo, altrimento ritorna un arrai vuoto per evitare errori
            if (!this.activeContact) return [];
            //crea una copia array di messages del contatti attivo
            const allMessages = [...this.activeContact.messages];
            //ritorna un array di msg ordinati secondo proprietà date
            return allMessages.sort((a,b) => new Date(a.date) - new Date(b.date));
        },
        sendMessage(text){

            const trimmedMsg = text.trim();

            // controllare se il messaggio è uovot
           if (trimmedMsg !== "") {
                const newMessage = {
                    date: new Date().toLocaleString(),
                    message: text,
                    status: 'sent',
                };
                // aggiungere nuovo msg
                this.activeContact.messages.push(newMessage);
              // pulire input
                this.newMessageText = ""
                console.log("Messaggio inviato");
                setTimeout(() => {
                    const responseMsg = {
                        date: new Date().toLocaleString(),
                        message: 'Okay!',
                        status: 'received',
                    }; 
                    this.activeContact.messages.push(responseMsg);

                }, 1000);
            }else{
                const newMessage = {
                    date: new Date().toLocaleString(),
                    message: text,
                    status: 'sent',
                };
                // aggiungere nuovo msg
                this.activeContact.messages.push(newMessage);
              // pulire input
                this.newMessageText = ""
                
                // simulare una risposta per un msg vuoto
                setTimeout(() => {
                    const responseMsg = {
                        date: new Date().toLocaleString(),
                        message: 'Perché mi mandi un messaggio vuoto??',
                        status: 'received',
                    };
                    this.activeContact.messages.push(responseMsg);
                }, 1000);
            }
           
            
        },
        searchContacts(){
            console.log('searchContact iniziato');
            console.log('Search Text:', this.searchText);
            console.log('Contacts:', this.contacts);
            return this.contacts.filter(contact =>
                contact.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
        

    },
    
}).mount("#app");
