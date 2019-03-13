import { connect } from 'herculex';

Component(connect({})({
  props: {
    myService: [],
  },
  methods: {
    goToNavigateUrl(e) {
      let { url } = e.target.dataset;
      console.log(e);
      this.dispatch('goToNavigateUrl', url);
    },
  },
}));
