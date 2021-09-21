<template>
  <div id="app" class="container-xxl">
    <div class="row mb-3">
      <div class="col">
        <select v-model="from" class="form-select">
          <option :value="null">{{$t('select')}}</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ILS">ILS</option>
        <!-- USD, EUR, GBP and ILS -->
        </select>
      </div>
      <div class="col">
        <select v-model="to" class="form-select">
          <option :value="null">{{$t('select')}}</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ILS">ILS</option>
        <!-- USD, EUR, GBP and ILS -->
        </select>
      </div>
      <div class="col">
        <input v-model="amount" class="form-control">
      </div>
    </div>

    <div class="row">
      <div class="col">
        <button class="btn btn-warning w-100" @click="reset">
          {{$t('reset')}}
        </button>
      </div>
      <div class="col">
        <button class="btn btn-primary w-100" :disabled="isLoading || !isValid" @click="convert">
          {{$t('convert')}}
          <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <div class="row mt-3">
      <div>
        {{$t('conversionRate')}}: {{conversionRate}}
      </div>
      <div>
        {{$t('expectedAmount')}}: {{result}}
      </div>
    </div>
  </div>
</template>

<script>
import currencyService from './services/currency';

export default {
  name: 'App',
  data() {
    return {
      storage: [],
      isLoading: false,
      from: null,
      to: null,
      amount: null,
      result: null,
      conversionRate: null,
    };
  },
  computed: {
    isValid() {
      return this.to && this.from && this.amount;
    },
  },
  methods: {
    reset() {
      this.from = null;
      this.to = null;
      this.amount = null;
      this.conversionRate = null;
      this.result = null;
    },
    async convert() {
      const foundItem = this.storage.find((item) => item.from === this.from && item.to === this.to);

      if (foundItem) {
        this.conversionRate = foundItem.exchangeRate;
        this.result = (this.amount * foundItem.exchangeRate).toFixed(2);
      } else {
        try {
          this.isLoading = true;
          const result = await currencyService.convert(this.from, this.to, this.amount);
          const { exchangeRate, quoteAmount } = result;
          this.conversionRate = exchangeRate;
          this.result = quoteAmount;

          this.storage.push({
            from: this.from,
            to: this.to,
            exchangeRate: result.exchangeRate,
          });
        } catch (error) {
          console.log('Error');
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style/base.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
