import { writable } from 'svelte/store';

export const toast = writable(null);

export function showToast(message, type = 'success') {

	toast.set({
		message,
		type
	});

	setTimeout(() => {
		toast.set(null);
	}, 2500);

}