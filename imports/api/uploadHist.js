import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const UploadHistory = new Mongo.Collection('uploadHistory');

UploadHistory.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});
  
UploadHistory.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

const UploadHistorySchema = new SimpleSchema ({
    id: { type: String },
    userName: { type: String },
    email: { type: String },
    content: { type: String },
    createdAt: {
        type: Date,
        autoform: {
          type: 'hidden',
          label: false,
        },
        defaultValue: new Date(),
    },
});

UploadHistory.attachSchema(UploadHistorySchema);
