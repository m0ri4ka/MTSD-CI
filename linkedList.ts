export class Node {
    value: string;
    next: Node;

    constructor(value: string) {
        this.value = value;
        this.next = this;
    }
}

export class LinkedList {
    head: Node | null = null;
    size: number = 0;

    length(): number {
        return this.size;
    }

    append(element: string) {
        const newNode = new Node(element);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
        this.size++;
    }

    insert(element: string, index: number) {
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }

        const newNode = new Node(element);

        if (index === 0) {
            if (!this.head) {
                newNode.next = newNode;
                this.head = newNode;
            } else {
                let tail = this.head;
                while (tail.next !== this.head) {
                    tail = tail.next;
                }
                newNode.next = this.head;
                tail.next = newNode;
                this.head = newNode;
            }
        } else {
            let prev = this.head!;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            newNode.next = prev.next;
            prev.next = newNode;
        }

        this.size++;
    }

    delete(index: number): string {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }

        let deletedValue: string;

        if (index === 0) {
            deletedValue = this.head!.value;
            if (this.size === 1) {
                this.head = null;
            } else {
                let tail = this.head!;
                while (tail.next !== this.head) {
                    tail = tail.next;
                }
                this.head = this.head!.next;
                tail.next = this.head;
            }
        } else {
            let prev = this.head!;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            deletedValue = prev.next.value;
            prev.next = prev.next.next;
        }

        this.size--;
        return deletedValue;
    }

    deleteAll(element: string) {
        if (!this.head) return;

        let changed = false;

        while (this.head && this.head.value === element) {
            this.delete(0);
            changed = true;
        }

        if (!this.head) return;

        let current = this.head;
        let index = 1;

        while (index < this.size) {
            const nextNode = current.next;
            if (nextNode.value === element) {
                current.next = nextNode.next;
                this.size--;
                changed = true;
            } else {
                current = current.next;
                index++;
            }
        }

        if (changed && this.head.value === element) {
            this.delete(0);
        }
    }

    get(index: number): string {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        let current = this.head!;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.value;
    }

    clone(): LinkedList {
        const cloned = new LinkedList();
        if (!this.head) return cloned;

        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            cloned.append(current.value);
            current = current.next;
        }
        return cloned;
    }

    reverse() {
        if (!this.head || this.size <= 1) return;

        let prev = this.head;
        let current = this.head.next;
        let next: Node;

        for (let i = 1; i < this.size; i++) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        current.next = prev;
        this.head = prev;
    }

    findFirst(element: string): number {
        if (!this.head) return -1;
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            if (current.value === element) return i;
            current = current.next;
        }
        return -1;
    }

    findLast(element: string): number {
        if (!this.head) return -1;
        let current = this.head;
        let lastIndex = -1;
        for (let i = 0; i < this.size; i++) {
            if (current.value === element) lastIndex = i;
            current = current.next;
        }
        return lastIndex;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    extend(other: LinkedList) {
        let current = other.head;
        for (let i = 0; i < other.length(); i++) {
            this.append(current!.value);
            current = current!.next;
        }
    }

    toArray(): string[] {
        const result: string[] = [];
        if (!this.head) return result;
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}
