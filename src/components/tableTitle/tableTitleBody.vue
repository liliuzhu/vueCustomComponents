<template>
  <div class="table_title_body">
    <div v-for="(item,index) in columns" :key="'body_'+index" class="table_title_cell">
      <scoped-slot v-if="item.data.scopedSlots" :renderNode="item.data.scopedSlots.default(tableData)"/>
      <span v-else>{{getPropByPath(tableData, item.componentOptions.propsData.prop).v}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getPropByPath} from './util'
  import getParentInfo from './getParentInfo'
  import scopedSlot from './scopedSlot'

  export default {
    name: 'TableTitleBody',
    components: {
      scopedSlot
    },
    mixins: [getParentInfo],
    data() {
      return {}
    },
    methods: {
      getPropByPath
    }
  }
</script>
