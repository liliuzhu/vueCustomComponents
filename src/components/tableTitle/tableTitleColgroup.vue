<template>
    <div class="table_title_colgroup">
        <col class="table_title_col" v-for="(item,index) in columns" :style="item.data.staticStyle" v-bind="getAttr(item)" :key="'colgroup_'+index"></col>
    </div>
</template>
<script type="text/ecmascript-6">
    import getParentInfo from './getParentInfo';

    export default {
        name: "table-title-colgroup",
        mixins: [getParentInfo],
        data() {
            return {};
        },
        methods: {
            getAttr(item) {
                return {...item.componentOptions.propsData, ...item.data.attr}
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="scss">
   .table_title_colgroup{
       display: table-column-group;
       .table_title_col{
           display: table-column;
       }
   }
</style>
