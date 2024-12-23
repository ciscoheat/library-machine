import interact from 'interactjs';
import type { Action } from 'svelte/action';
import type { DraggableOptions } from '@interactjs/actions/drag/plugin';
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
		DraggableOptions & { object: Record<string, unknown>; pos: { x: number; y: number } }
	> = (el, opts) => {
		let startPos: { x: number; y: number };
		this.data.set(el, opts.object);
		interact(el).draggable({
			...opts,
			modifiers: [
				...(opts.modifiers ?? []),
				interact.modifiers.restrict({
					restriction: document.documentElement
				})
			],
			onstart: (e) => {
				// Need to use rest operator to clone the object if it's a Proxy
				startPos = structuredClone({ ...opts.pos });
				if (typeof opts.onstart === 'function') opts.onstart(e);
			},
			onmove: (e) => {
				opts.pos.x += e.dx;
				opts.pos.y += e.dy;
				if (typeof opts.onmove === 'function') opts.onmove(e);
			},
			onend: (e) => {
				// Check if drop is allowed
				if (!e.relatedTarget || this.preventDrop.has(e.relatedTarget)) {
					opts.pos.x = startPos.x;
					opts.pos.y = startPos.y;
				} else {
					console.log('Dropped on', e.relatedTarget);
				}
				if (typeof opts.onend === 'function') opts.onend(e);
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
