<template>
  <div id="app" class="container-xxl">
    <div class="row">
      <div class="col">
        <select v-model="from" class="form-select">
          <option :value="null">Pick</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ILS">ILS</option>
        <!-- USD, EUR, GBP and ILS -->
        </select>
      </div>
      <div class="col">
        <select v-model="to" class="form-select">
          <option :value="null">Pick</option>
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
      <button class="btn btn-primary" :disabled="isLoading" @click="convert">
        TEST
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
    </div>

    <div class="row">
      Result: {{result}}
    </div>
  </div>
</template>

<script>
import currencyService from './services/currency';

export default {
  name: 'App',
  data() {
    return {
      isLoading: false,
      from: null,
      to: null,
      amount: null,

      result: null,
    };
  },
  methods: {
    async convert() {
      try {
        this.isLoading = true;
        const result = await currencyService.convert(this.from, this.to, this.amount);
        this.result = result.quoteAmount;
      } catch (error) {
        console.log('Error');
        console.log(error);
      } finally {
        this.isLoading = false;
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
