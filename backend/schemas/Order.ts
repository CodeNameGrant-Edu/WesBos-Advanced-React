import { text, select, integer, relationship, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item) {
        return `${item.charge}; ${formatMoney(item.total)}`;
      }
    }),
    total: integer(),
    items: relationship({
      ref: 'OrderItem.order',
      many: true
    }),
    user: relationship({
      ref: 'User.orders'
    }),
    charge: text()
  }
});
