<template>
    <span class="ui-checkbox">
        <input type="checkbox"
               @change="$emit('change', $event.target.checked)"
               class="ui-checkbox__element"
               :checked="value">
        <span class="ui-checkbox__indicator"></span>
    </span>
</template>

<script>
export default {
  name: 'UiCheckbox',

  props: {
    value: {
      required: false
    }
  }
}
</script>

<style lang="scss">
    @import "../design/main";

    .ui-checkbox {
        display: block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: relative;
    }

    .ui-checkbox__element {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #f00;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        z-index: 2;
        opacity: 0;
    }

    .ui-checkbox__indicator {
        position: absolute;
        width: 100%;
        height: 100%;
        border:1px solid darkgrey;
        border-radius: 50%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        z-index: 1;
    }

    .ui-checkbox__element:checked + .ui-checkbox__indicator {
        border:2px solid white;

        &:after{
            content: '';
            display: block;
            margin-left: 8px;
            width: 5px;
            height: 15px;
            border: solid #fff;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }
</style>
