import { writable } from "svelte/store";
import { localStore } from "./localStore";

export const alert = writable("Welcome to To-Do with Svelte")

export const todos = localStore("todo-with-svelte", [])