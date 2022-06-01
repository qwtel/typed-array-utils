// deno-lint-ignore-file no-unused-vars
import 'https://gist.githubusercontent.com/qwtel/b14f0f81e3a96189f7771f83ee113f64/raw/TestRequest.ts'
import {
  assert,
  assertExists,
  assertEquals,
  assertStrictEquals,
  assertStringIncludes,
  assertThrows,
  assertRejects,
} from 'https://deno.land/std@0.133.0/testing/asserts.ts'
const { test } = Deno;

import { hexStringToBytes, combineUint8Arrays, concatUint8Arrays, combineBufferSources, concatBufferSources } from '../index.ts'

test('hexStringToBytes', () => {
  assertEquals(hexStringToBytes('ff'), new Uint8Array([255]))
  assertEquals(hexStringToBytes('ff:ff'), new Uint8Array([255, 255]))
  assertEquals(hexStringToBytes('ff-ff'), new Uint8Array([255, 255]))
})

test('combineUint8Arrays', () => {
  assertEquals(
    combineUint8Arrays([new Uint8Array([1, 2]), new Uint8Array([3, 4])]), 
    new Uint8Array([1, 2, 3, 4]),
  )
})

test('concatUint8Arrays', () => {
  assertEquals(
    concatUint8Arrays(...[new Uint8Array([1, 2]), new Uint8Array([3, 4])]), 
    new Uint8Array([1, 2, 3, 4]),
  )
})

test('combineBufferSources', () => {
  assertEquals(
    combineBufferSources([new Uint8Array([1, 2]), new Uint16Array([2**16 - 1])]), 
    new Uint8Array([1, 2, 255, 255]),
  )
  assertEquals(
    combineBufferSources([new Uint8Array([1, 2]), new Uint32Array([2**32 - 1])]), 
    new Uint8Array([1, 2, 255, 255, 255, 255]),
  )
})

test('concatBufferSources', () => {
  assertEquals(
    concatBufferSources(...[new Uint8Array([1, 2]), new Uint16Array([2**16 - 1])]), 
    new Uint8Array([1, 2, 255, 255]),
  )
  assertEquals(
    concatBufferSources(...[new Uint8Array([1, 2]), new Uint32Array([2**32 - 1])]), 
    new Uint8Array([1, 2, 255, 255, 255, 255]),
  )
})