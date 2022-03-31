import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

import preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'

import * as path from 'path'

const PRODUCTION = !process.env.ROLLUP_WATCH

function serve () {
  // eslint-disable-next-line immutable/no-let
  let server

  function toExit () {
    if (server) server.kill(0)
  }

  return {
    writeBundle () {
      if (server) return
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      })

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      preprocess: preprocess({ postCss: [autoprefixer()] }),
      emitCss: true,
      compilerOptions: {
        dev: !PRODUCTION,
      },
    }),
    css({ output: 'bundle.css' }),
    alias({
      entries: [
        { find: '$utils', replacement: path.resolve(__dirname, 'src', 'utils') },
        { find: '$lib', replacement: path.resolve(__dirname, 'src', 'library') },
        { find: '$service', replacement: path.resolve(__dirname, 'src', 'services') },
      ],
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    json(),
    injectProcessEnv({
      NODE_ENV: PRODUCTION
        ? 'production'
        : 'development',
	    DB_NAME: 'myappdb',
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !PRODUCTION && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !PRODUCTION && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    PRODUCTION && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
