import UiButton from '../../components/UiButton/UiButton'

export default {
  components: {
    UiButton
  },
  computed: {
    routerName () {
      return this.$route.name
    }
  },
  mounted: function () {
    this.$i18n.locale = this.$route.query.lang ? this.$route.query.lang.toLowerCase() : 'en'
  }
}
