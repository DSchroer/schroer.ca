import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { leftPad } from "./left-pad.ts";

Deno.test("should pad", () => {
  assertEquals(leftPad("test", 5), " test");
});

Deno.test("should return string on zero input", () => {
  assertEquals(leftPad("test", 0), "test");
});

Deno.test("should return string on negative input", () => {
  assertEquals(leftPad("test", -1), "test");
});

Deno.test("should support custom padding", () => {
  assertEquals(leftPad("test", 6, "+"), "++test");
});

Deno.test("should support custom padding", () => {
  assertEquals(leftPad(12, 4), "  12");
});
