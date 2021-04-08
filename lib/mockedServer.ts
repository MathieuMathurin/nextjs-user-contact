import {createServer, Model, Request, Response} from 'miragejs';
import {ModelDefinition, Registry} from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';
import { v4 as uuid } from 'uuid';
import { Contact } from '../models/contact';

const ContactModel: ModelDefinition<Contact> = Model.extend({});

type AppRegistry = Registry<{ contact: typeof ContactModel; }, {}>;
type AppSchema = Schema<AppRegistry>;

export function createMockServer() {
  createServer({
    models: {
      contact: ContactModel,
    },

    routes() {
      this.namespace = 'api';

      this.get('/users/:userId/contacts', (schema: AppSchema, request: Request) => {
        const userId = request.params.userId;
        return schema.where('contact', { userId });
      });

      this.post('/users/:userId/contacts', (schema: AppSchema, request: Request) => {
        const userId = request.params.userId;
        const contact: Contact = {
          ...JSON.parse(request.requestBody),
          id: uuid(),
          userId
        };

        return schema.create('contact', contact);
      });

      this.get('/users/:userId/contacts/:contactId', (schema: AppSchema, request: Request) => {
        const userId = request.params.userId;
        const contactId = request.params.contactId;
        
        return schema.findBy('contact', { userId, id: contactId });
      })

      this.delete('/users/:userId/contacts/:contactId', (schema: AppSchema, request: Request) => {
        const userId = request.params.userId;
        const contactId = request.params.contactId;
        
        schema.findBy('contact', { userId, id: contactId }).destroy();

        return new Response(204);
      });

      this.put('/users/:userId/contacts/:contactId', (schema: AppSchema, request: Request) => {
        const userId = request.params.userId;
        const contactId = request.params.contactId;
        const contact: Contact = {
          ...JSON.parse(request.requestBody)
        };
        
        schema.findBy('contact', { userId, id: contactId }).update(contact);

        return new Response(200);
      })

      this.passthrough('/auth/**')
      
      this.namespace = '_next';
      this.passthrough('/**')
    },
  });
}
