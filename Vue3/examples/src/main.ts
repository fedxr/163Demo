import { createApp } from 'vue'
import './style.css'
import App from './App'
import { createRouter, createWebHashHistory } from 'vue-router'
import { MyRouteType } from "./mytypes";

const examples = import.meta.glob("./examples/**/*.tsx")

const examplePromises = Object.keys(examples)
	.map(x => examples[x])
	.map(f => f())

const routes: MyRouteType[] = []
Promise.all(examplePromises)
	.then(list => {
		for (let module of list) {
			for (let key in module) {
				const Component = module[key]
				routes.push({
					path: "/" + key.toLocaleLowerCase(),
					key,
					component: Component
				})
			}
		}

		const router = createRouter({
			history: createWebHashHistory(),
			routes
		})

		const app = createApp(App, {routes})
		app.use(router).mount('#app')
		console.log(list[0]);
	})
