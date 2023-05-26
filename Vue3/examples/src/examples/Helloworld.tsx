import { defineComponent } from "vue"

export const Helloworld = defineComponent({
	setup(){
		return () => {
			return (<h1>Hello World</h1>)
		}
	}
})
