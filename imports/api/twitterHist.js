import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const Twitter_History = new Mongo.Collection('twitter_history');

Twitter_History.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});
  
Twitter_History.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

const Twitter_History_Schema = new SimpleSchema {
    userName: { type: String },
    createdAt: {
        type: Date,
        autoform: {
          type: 'hidden',
          label: false,
        },
        defaultValue: new Date(),
    },
}
