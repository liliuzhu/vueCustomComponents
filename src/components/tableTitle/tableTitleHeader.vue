<template>
  <div class="table_title_header">
    <div v-for="(item,index) in columns" :key="'header_'+index" class="table_title_cell">
      {{item.componentOptions.propsData.label}}
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import getParentInfo from './getParentInfo'

  export default {
    name: 'TableTitleHeader',
    mixins: [getParentInfo],
    data() {
      return {}
    }
  }
</script>
