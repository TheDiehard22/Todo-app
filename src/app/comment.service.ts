import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private comments: { [pageId: number]: string[] } = {};

    addComment(pageId: number, comment: string) {
        if (!this.comments[pageId]) {
            this.comments[pageId] = [];
        }
        this.comments[pageId].push(comment);
    }

    getComments(pageId: number): string[] {
        return this.comments[pageId] || [];
    }
}
