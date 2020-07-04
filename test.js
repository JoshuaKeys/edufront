const classes = [
    { "name": "12", "grade": 12, "classGroupId": "7807e313-32d1-4953-a1d9-b87c60d5d8d9", "id": "0b0a55e2-8df7-11ea-9726-57ffaf54a22e", "teachers": [], "subjects": [] },
    { "name": "6", "grade": 6, "classGroupId": "fcf5ac48-49d3-43a6-81df-ad437663fad5", "id": "b96a53c2-8df6-11ea-9720-1323d471c03e", "teachers": [], "subjects": [] },
    { "name": "7", "grade": 7, "classGroupId": "3f44677c-0c74-48cf-8052-0dfa7e134bb6", "id": "c57c06ba-8df6-11ea-9721-a773ed0f79c6", "teachers": [], "subjects": [] },
    { "name": "11", "grade": 11, "classGroupId": "7807e313-32d1-4953-a1d9-b87c60d5d8d9", "id": "f7966d8e-8df6-11ea-9725-1ba133b5817d", "teachers": [], "subjects": [] },
    { "name": "9", "grade": 9, "classGroupId": "3f44677c-0c74-48cf-8052-0dfa7e134bb6", "id": "e0b640e4-8df6-11ea-9723-1b56557aa5e9", "teachers": [], "subjects": [] },
    { "name": "10", "grade": 10, "classGroupId": "7807e313-32d1-4953-a1d9-b87c60d5d8d9", "id": "ed1a9344-8df6-11ea-9724-cb37ccbda8c1", "teachers": [], "subjects": [] },
    { "name": "4", "grade": 4, "classGroupId": "3b16f13c-91da-11ea-8eeb-063100681874", "id": "a1f84fb4-8df6-11ea-971e-3f7df9a327fb", "teachers": [], "subjects": [] },
    { "name": "2", "grade": 2, "classGroupId": "3b16f13c-91da-11ea-8eeb-063100681874", "id": "8e33f4c4-8df6-11ea-971c-af6cdeacf7b0", "teachers": [], "subjects": [] },
    { "name": "1", "grade": 1, "classGroupId": "3b16f13c-91da-11ea-8eeb-063100681874", "id": "855b9348-8df6-11ea-971b-a35658713d38", "teachers": [], "subjects": [] },
    { "name": "5", "grade": 5, "classGroupId": "fcf5ac48-49d3-43a6-81df-ad437663fad5", "id": "aea8dd8c-8df6-11ea-971f-cb02491d4175", "teachers": [], "subjects": [] },
    { "name": "8", "grade": 8, "classGroupId": "3f44677c-0c74-48cf-8052-0dfa7e134bb6", "id": "d3a6d490-8df6-11ea-9722-ab05ab4c71a9", "teachers": [], "subjects": [] },
    { "name": "3", "grade": 3, "classGroupId": "3b16f13c-91da-11ea-8eeb-063100681874", "id": "960edaba-8df6-11ea-971d-eb1e97cddd39", "teachers": [], "subjects": [] }
];

const testClasses = [
    { "name": "12", "grade": 12, "classGroupId": "7807e313-32d1-4953-a1d9-b87c60d5d8d9", "id": "0b0a55e2-8df7-11ea-9726-57ffaf54a22e", "teachers": [], "subjects": [] },
    { "name": "6", "grade": 6, "classGroupId": "fcf5ac48-49d3-43a6-81df-ad437663fad5", "id": "b96a53c2-8df6-11ea-9720-1323d471c03e", "teachers": [], "subjects": [] },
    { "name": "7", "grade": 7, "classGroupId": "3f44677c-0c74-48cf-8052-0dfa7e134bb6", "id": "c57c06ba-8df6-11ea-9721-a773ed0f79c6", "teachers": [], "subjects": [] },
    { "name": "11", "grade": 11, "classGroupId": "7807e313-32d1-4953-a1d9-b87c60d5d8d9", "id": "f7966d8e-8df6-11ea-9725-1ba133b5817d", "teachers": [], "subjects": [] },
]

function buildRangePipe(items) {
    const res = [];
    let currentIdx = 0;
    for (let i = 0; i < items.length; i++) {
        if (i === 0) {
            res.push({ start: items[0] });
        } else if (items[i] - 1 === items[i - 1]) {
            res[currentIdx].end = items[i];
        } else {
            res.push({ start: items[i], end: null });
            currentIdx += 1;
        }
    }

    return res.reduce((prev, curr, idx, arr) => {
        if (curr.start && curr.end) {
            if (arr.length - 1 !== idx) {
                if (curr.end - curr.start > 1) {
                    return (prev += `${curr.start}-${curr.end}|`);
                }
                return (prev += `${curr.start}|${curr.end}|`)
            }
            return (prev += `${curr.start}-${curr.end}`);
        } else if (curr.start && !curr.end) {
            return (prev += `${curr.start}`);
        }
    }, '');
}

console.log(buildRangePipe([1, 2, 3, 4, 5, 6, 8, 9, 11]));