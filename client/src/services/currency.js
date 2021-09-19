import Repository from './repository';
import { currency } from '../endpoints';

const client = new Repository();

export default {
  async testFunc() {
    const r = await client.get(currency.test);
    return r;
  },
  async convert(baseCurrency, quoteCurrency, baseAmount) {
    const r = await client.get(currency.convert, { baseCurrency, quoteCurrency, baseAmount });
    return r;
  },
};
