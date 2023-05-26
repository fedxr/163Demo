import { defineComponent, reactive } from "vue";

export const ReactiveExample01 = defineComponent({
  setup() {
    const state = reactive({
      a: "123",
      b: 2,
    });

    setTimeout(() => {
      state.a = "456";
    }, 1000);

    setTimeout(() => {
      state.b = 100;
    }, 2000);
		
    return () => {
      return (
        <div>
          <div>{state.a}</div>
          <div>{state.b}</div>
        </div>
      );
    };
  },
});
