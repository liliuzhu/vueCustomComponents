<template>
    <div class="table_title_header">
        <div class="table_title_cell" v-for="(item,index) in columns" :key="'header_'+index">{{item.componentOptions.propsData.label}}</div>
    </div>
</template>
<script type="text/ecmascript-6">
    import getParentInfo from './getParentInfo';

    export default {
        name: "table-title-header",
        mixins: [getParentInfo],
        data() {
            return {};
        }
    };
</script>
