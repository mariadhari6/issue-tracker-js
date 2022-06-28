function fetchIssue() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById("issuesList");
    issuesList.innerHTML = '';
    for (let i = 0; i < issues?.length; i++) {
        const { id, description, severity, assign, status } = issues[i]
        issuesList.innerHTML += `
            <div class="whell">
                <h6>Issue ID: ${id}</h6>
                <p><span class="label label-info">${status}</span></p>
                <h3>${description}</h3>
                <p><span class="glyphicon glyphicon-user">${assign}</span></p>` +
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a>' +
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a>' +
            '<div>';
    }
}
document.getElementById("issueForm").addEventListener("submit", saveIssue)
function saveIssue(e) {
    e.preventDefault();
    const id = chance.guid();
    const description = document.getElementById("description").value;
    const severity = document.getElementById("severity").value;
    const assign = document.getElementById("assign").value;
    const status = "Open";
    const issue = { id, description, severity, assign, status };
    if (localStorage.getItem('issues') === null) {
        const issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else {
        const issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    }
    document.getElementById('issueForm').reset();
    fetchIssue();
}
function setStatusClosed(id) {
    const issues = JSON.parse(localStorage.getItem('issues'));
    for (let i = 0; i < issues?.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssue();
}
function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    if (issues?.length === 1 && issues[0].id === id) {
        issues = []
    }
    else {
        issues = issues.filter((issue) => {
            return issue.id == id;
        });
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssue();
}