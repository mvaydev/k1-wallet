import PocketBase, { RecordService } from 'pocketbase';

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

export interface Staff {
	id: string;
	email: string;
	fullname: string;
	role?: 'Ассистент' | 'Тьютор' | 'Менеджер';
	campus: string;
}

export interface KiberonTransaction {
	id: string;
	amount: number;
	comment?: string;
	student: string;
	created: string;
}

interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: 'student'): RecordService<Student>;
	collection(idOrName: 'group'): RecordService<Group>;
	collection(idOrName: 'campus'): RecordService<Group>;
	collection(idOrName: 'director'): RecordService<Group>;
	collection(idOrName: 'staff'): RecordService<Group>;
	collection(idOrName: 'kiberon_transaction'): RecordService<KiberonTransaction>;
}

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL) as TypedPocketBase;
