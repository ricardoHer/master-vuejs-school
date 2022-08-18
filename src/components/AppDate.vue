<template>
  <span :title="timeStamp | humanFriendlyDate">{{ timeStamp | diffForHumas }}</span>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    timeStamp: {
      required: true,
      type: Number,
    },
  },
  filters: {
    humanFriendlyDate(date) {
      return moment
        .unix(date)
        .locale("pt-BR")
        .format("MMMM Do YYYY, h:mm:ss a");
    },
    diffForHumas(date) {
      return moment.unix(date).locale("pt-BR").fromNow();
    },
  },
};
</script>
