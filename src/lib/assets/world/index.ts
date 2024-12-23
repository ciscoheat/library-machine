import interact from 'interactjs';
import type { Action } from 'svelte/action';
import type { DropzoneOptions } from '@interactjs/actions/drop/plugin';

class World {
	private data = new WeakMap<HTMLElement, Record<string, unknown>>();
	private preventDrop = new WeakSet<HTMLElement>();

	private add(el: HTMLElement, object: Record<string, unknown>) {
		this.data.set(el, object);
	}

	public readonly droppable: Action<
		HTMLElement,
		(DropzoneOptions & { prevent?: boolean }) | undefined
	> = (node, opts?) => {
		interact(node).dropzone(opts ?? {});
		if (opts?.prevent) this.preventDrop.add(node);
		return {
			destroy: () => {
				world.remove(node);
				this.preventDrop.delete(node);
			}
		};
	};

	public readonly draggable: Action<
		HTMLElement,
		{ object: Record<string, unknown>; pos: { x: number; y: number } }
	> = (el, opts) => {
		let startPos: { x: number; y: number };
		this.data.set(el, opts.object);
		interact(el).draggable({
			modifiers: [
				interact.modifiers.restrict({
					restriction: document.documentElement
				})
			],
			onstart: () => {
				// Need to use rest operator to clone the object if it's a Proxy
				startPos = structuredClone({ ...opts.pos });
			},
			onmove: (event) => {
				opts.pos.x += event.dx;
				opts.pos.y += event.dy;
			},
			onend: (e) => {
				console.log(e.relatedTarget);
				if (e.relatedTarget && !this.preventDrop.has(e.relatedTarget)) {
					return;
				}
				opts.pos.x = startPos.x;
				opts.pos.y = startPos.y;
			}
		});

		return {
			destroy: () => world.remove(el)
		};
	};

	public get(el: HTMLElement) {
		return this.data.get(el);
	}

	public remove(el: HTMLElement) {
		interact(el).unset();
		this.data.delete(el);
	}
}
/**
 * Connects the drag and drop DOM elements to the actual data model
 */
export const world = new World();
