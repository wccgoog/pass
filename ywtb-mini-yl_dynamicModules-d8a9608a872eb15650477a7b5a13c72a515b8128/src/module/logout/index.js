import { connect } from 'herculex';

Component(connect({})({
  methods: {
    onLogoutClick(e) {
      this.dispatch('onLogout');
    },
  },
}));
