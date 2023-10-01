(function () {
  const max_limit = undefined; // to specify max number of invitations to withdraw or define undefined for all
  var getInvitations = () => {
    var withdrawInvitationContainers = document.querySelectorAll(
      "div.invitation-card__action-container"
    );
    return withdrawInvitationContainers;
  };

  var removeInvitations = async () => {
    let invitations = getInvitations();
    let counter = 0;
    for (let invitation of invitations) {
      if (max_limit !== undefined && counter >= max_limit) return;
      const actionButton = invitation.querySelector(
        "button.invitation-card__action-btn"
      );
      console.log(actionButton.getAttribute("aria-label"));
      await new Promise((resolve) => {
        actionButton.click();
        var intervalId = setInterval(() => {
          if (
            document.querySelector(
              "[data-test-modal-container] > [data-test-modal] [data-test-dialog-primary-btn]"
            )
          ) {
            clearInterval(intervalId);
            document
              .querySelector(
                "[data-test-modal-container] > [data-test-modal] [data-test-dialog-primary-btn]"
              )
              .click();
            setTimeout(resolve, 1000);
          }
        });
      });
      counter++;
    }
    console.log(
      `-----------------------Withdraw invitation script completed-----------------------`
    );
    console.log(
      `-----------------------${invitations.length} pending invitation withdrawn-------------------------------`
    );
  };
  removeInvitations();
})();
