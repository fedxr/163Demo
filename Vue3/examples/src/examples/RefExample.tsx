import { defineComponent, mergeProps, PropType, Ref, ref } from "vue";

export const RefExample01 = defineComponent({
  setup() {
    const count = ref(0);
    return () => {
      return (
        <div>
          <button
            onClick={() => {
              count.value++;
            }}
          >
            +
          </button>
          {count.value}
        </div>
      );
    };
  },
});

export const RefExample02 = defineComponent({
  setup() {
    const count = ref(0);
    return () => {
      return (
        <div>
          <button
            onClick={() => {
              count.value++;
            }}
          >
            +
          </button>
          <Counter count={count} />
          <Count1 count={count} />
        </div>
      );
    };
  },
});

const Counter = ({ count }: { count: Ref<number> }) => {
  return <div>{count.value}</div>;
};

const Count1 = defineComponent({
  props: {
    count: {
      type: Object as PropType<Ref<number>>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return <div>{props.count.value}</div>;
    };
  },
});
