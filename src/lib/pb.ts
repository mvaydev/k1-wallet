import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export interface Student {
	id: string;
	email: string;
	fullname: string;
	kiberon_balance: number;
	group: string;
}

export interface Group {
	id: string;
	weekday: string;
	start_time: string;
	age_range: string;
	campus: string;
}

export interface Campus {
	id: string;
	address: string;
	capacity: number;
	director: string;
}

export interface Director {
	id: string;
	email: string;
	fullname: string;
}
