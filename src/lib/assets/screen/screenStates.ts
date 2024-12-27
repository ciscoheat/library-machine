export enum Display {
	Welcome = 0,
	EnterPIN = 1,
	ThankYou = 2,
	Items = 3,
	Error = 4
}

export type ScreenState =
	| { display: Display.Welcome }
	| { display: Display.EnterPIN; attempts: number }
	| { display: Display.ThankYou }
	| { display: Display.Items; items: { title: string; expires: Date }[] }
	| { display: Display.Error; error: Error };
