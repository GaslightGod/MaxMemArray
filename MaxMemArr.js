class MaxMemArray {
    #_storage = null;
    end_ptr = 0;
    max_len = 0;
  
    constructor(max_len, storage = Array(2 * max_len)) {
      this.#_storage = storage;
      this.max_len = max_len;
      if (process.env.TRIVIAL) {
        this.q = new Proxy(this, {
          get: (o, k) => isNaN(+k) ? o[k] : o.get(+k),
          set: (o, k, v) => isNaN(+k) ? (o[k] = v) : o.set(+k, v),
        });
      }
    }
  
    push(e) {
      if (this.end_ptr === this.#_storage.length) this.consolidate();
      this.#_storage[this.end_ptr++] = e;
    }
  
    pop() {
      this.#_storage[--this.end_ptr - this.max_len] = undefined;
      return this.#_storage[this.end_ptr];
    }
  
    get(i) {
      return this.#_storage[i + this.end_ptr - this.max_len];
    }
  
    set(i, v) {
      this.#_storage[i + this.end_ptr - this.max_len] = v;
    }
  
    consolidate() {
        for (let i = 0, L = this.max_len; i !== L; ++i) {
            this.#_storage[i] = this.#_storage[i + L];
        }
        this.end_ptr = this.max_len;
    }
  
    slice() {
        const start = this.end_ptr - this.max_len;
        const adjustedStart = start < 0 ? start + this.#_storage.length : start;
        const adjustedEnd = this.end_ptr < 0 ? this.end_ptr + this.#_storage.length : this.end_ptr;
        return this.#_storage.slice(adjustedStart, adjustedEnd);
    }
    
  
    shift() {
      if (this.end_ptr > 0) {
        this.#_storage.shift();
        this.end_ptr = Math.max(0, this.end_ptr - 1);
      }
    }
    
    unshift(e) {
        if (this.end_ptr < this.#_storage.length) {
            for (let i = this.end_ptr; i > 0; i--) {
                this.#_storage[i] = this.#_storage[i - 1];
            }
            this.#_storage[0] = e;
            this.end_ptr += 1;
        }
    }
  
    splice(start, deleteCount, ...items) {
      const removed = this.#_storage.slice(start + this.end_ptr - this.max_len, start + this.end_ptr - this.max_len + deleteCount);
      const remaining = this.#_storage.slice(0, start + this.end_ptr - this.max_len)
        .concat(items, this.#_storage.slice(start + this.end_ptr - this.max_len + deleteCount));
  
      if (remaining.length > this.max_len) {
        // If the result is longer than max_len, consolidate to maintain the circular buffer's length
        const consolidatedLength = Math.min(remaining.length, this.max_len);
        for (let i = 0; i < consolidatedLength; i++) {
          this.#_storage[i] = remaining[i];
        }
        this.end_ptr = consolidatedLength;
      } else {
        // Otherwise, update the buffer with the new content
        for (let i = 0; i < remaining.length; i++) {
          this.#_storage[i] = remaining[i];
        }
        this.end_ptr = remaining.length;
      }
  
      return removed;
    }
  }
  
  module.exports = MaxMemArray;