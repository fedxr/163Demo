import babel from '@rollup/plugin-babel'
import path from 'path'
import typescirpt from 'rollup-plugin-typescript'

export default [{
    input: path.resolve(__dirname, '../src/main.tsx'),
    output: {
        file: 'build/main.js',
        format: 'amd',
        name: 'main'
    },

    plugins: [
        typescirpt(),
        babel({
            presets:["@babel/preset-react"]
        })
    ]
}]