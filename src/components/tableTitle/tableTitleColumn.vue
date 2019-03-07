<template>
    <div class="table_title_column" :style="{flex: width}">
        <div class="title">{{label}}</div>
        <div class="content">
            <slot v-if="this.$scopedSlots.default" v-bind="tableData"></slot>
            <span v-else>{{getPropByPath(tableData, prop).v}}</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getPropByPath} from './util';
    import getParentInfo from './getParentInfo';
    export default {
        name: "table-title-column",
        mixins: [getParentInfo],
        data() {
            return {

            };
        },
        props: {
            prop: String,
            label: String,
            width: {
                type: Number,
                default: 1
            }
        },
        methods: {
            getPropByPath
        }
    };
</script>
