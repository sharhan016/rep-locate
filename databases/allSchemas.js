// import Realm from 'realm';
// export const EVENTLIST_SCHEMA = "EventList";
// export const EVENT_SCHEMA = "Event";

// export const EventSchema = {
//     name: EVENT_SCHEMA,
//     primaryKey: 'id',
//     properties: {
//         id: 'int',
//         date: 'string',
//         event: 'string'
//         //event: { type: 'string', indexed: 'true' }
//     }
// };

// export const EventListSchema = {
//     name: EVENTLIST_SCHEMA,
//     primaryKey: 'id',
//     properties: {
//         id: 'int',
//         event: 'string',
//         date: 'string',
//         //events: { type: 'list', objectType: EventSchema}
//         //events: { EventSchema}
//     }
// };

// const databaseOptions = {
//     path: 'eventList.realm',
//     schema: { EventSchema,EventListSchema},
//     //schema: { EventSchema},
//     schemaVersion: 1,
// };

// export const insertNewEventList = newEventList => new Promise((resolve, reject) => {

//     Realm.open(databaseOptions).then(realm => {
//         realm.write( () => {
//             realm.create(EVENTLIST_SCHEMA, newEventList);
//             resolve(newEventList);
//         });
//     }).catch((error) => reject(error));
// });

// export const updateEventList = eventList => new Promise((resolve, reject) => {

//     Realm.open(databaseOptions).then(realm => {
//         realm.write( () => {
//             let updatingEventList = realm.objectForPrimaryKey(EVENTLIST_SCHEMA, eventList.id);
//             updateEventList.event = eventList.event;
//             resolve();
//         });
//     }).catch((error) => reject(error));
// });

// export const deleteEventList = eventListId => new Promise((resolve, reject) => {

//     Realm.open(databaseOptions).then(realm => {
//         realm.write( () => {
//             let deletingEventList = realm.objectForPrimaryKey(EVENTLIST_SCHEMA, eventListId);
//             realm.delete(deletingEventList);
//             resolve();
//         });
//     }).catch((error) => reject(error));
// });



// export const queryAllEventLists = () => new Promise( (resolve, reject) => {
//     Realm.open(databaseOptions).then( realm => {
//         let allEventLists = realm.objects(EVENTLIST_SCHEMA);
//         resolve(allEventLists);
//     }).catch((error) => reject(error));
// });

// //export default new Realm(databaseOptions);