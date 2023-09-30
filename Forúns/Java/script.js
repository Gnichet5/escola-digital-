document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formPost');
  const textarea = document.getElementById('textarea');
  const commentList = document.getElementById('commentList');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const commentText = textarea.value;

    if (commentText.trim() === '') {
      return;
    }

    const commentElement = createCommentElement('Aluno', commentText);

    const replyButton = createReplyButton();
    const replyContainer = createReplyContainer();

    replyButton.addEventListener('click', function () {
      const replyForm = createReplyForm();

      replyForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const replyText = replyForm.querySelector('.reply-textarea').value;
        if (replyText.trim() === '') {
          return;
        }

        const replyElement = createCommentElement('Aluno (resposta)', replyText);
        replyContainer.appendChild(replyElement);

        replyForm.querySelector('.reply-textarea').value = '';

        // Fecha o formulário de resposta após o envio
        replyForm.style.display = 'none';
      });

      replyContainer.appendChild(replyForm);
    });

    commentElement.appendChild(replyButton);
    commentElement.appendChild(replyContainer);
    commentList.appendChild(commentElement);

    textarea.value = '';
  });

  // Função para criar um elemento de comentário com cabeçalho e texto
  function createCommentElement(author, text) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';

    const commentHeader = document.createElement('strong');
    commentHeader.textContent = author;

    const commentTextDiv = document.createElement('div');
    commentTextDiv.textContent = text;

    const currentTime = new Date();
    const commentTime = document.createElement('div');
    commentTime.className = 'comment-time';
    commentTime.textContent = `Postado em: ${currentTime.toLocaleString()}`;

    commentElement.appendChild(commentHeader);
    commentElement.appendChild(commentTextDiv);
    commentElement.appendChild(commentTime);

    return commentElement;
  }

  // Função para criar o botão "Responder"
  function createReplyButton() {
    const replyButton = document.createElement('button');
    replyButton.textContent = 'Responder';
    replyButton.className = 'reply-button';
    return replyButton;
  }

  // Função para criar o contêiner de respostas
  function createReplyContainer() {
    const replyContainer = document.createElement('div');
    replyContainer.className = 'reply-container';
    return replyContainer;
  }

  // Função para criar o formulário de resposta
  function createReplyForm() {
    const replyForm = document.createElement('form');
    replyForm.className = 'reply-form';

    const replyTextarea = document.createElement('textarea');
    replyTextarea.name = 'replyTextarea';
    replyTextarea.placeholder = 'Responda a este comentário';
    replyTextarea.className = 'reply-textarea';

    const replySubmitButton = document.createElement('button');
    replySubmitButton.type = 'submit';
    replySubmitButton.textContent = 'Enviar';

    replyForm.appendChild(replyTextarea);
    replyForm.appendChild(replySubmitButton);

    return replyForm;
  }
});
