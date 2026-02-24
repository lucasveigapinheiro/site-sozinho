// Script para adicionar funcionalidade de expandir/recolher cards de projetos
document.addEventListener('DOMContentLoaded', function() {
    const projetoCards = document.querySelectorAll('.projeto-card');
    
    projetoCards.forEach(card => {
        // Criar botão de expandir/recolher
        const botaoExpandir = document.createElement('button');
        botaoExpandir.className = 'botao-expandir';
        botaoExpandir.innerHTML = '▼ Ver mais';
        botaoExpandir.setAttribute('aria-label', 'Expandir informações do projeto');
        botaoExpandir.setAttribute('aria-expanded', 'false');
        
        // Encontrar o elemento p (descrição)
        const descricao = card.querySelector('p');
        const descricaoOriginal = descricao.textContent;
        
        // Limitar descrição inicialmente
        const limiteCaracteres = 100;
        if (descricaoOriginal.length > limiteCaracteres) {
            descricao.textContent = descricaoOriginal.substring(0, limiteCaracteres) + '...';
            botaoExpandir.style.display = 'inline-flex';
        } else {
            botaoExpandir.style.display = 'none';
        }
        
        // Adicionar evento de clique
        botaoExpandir.addEventListener('click', function() {
            const estaExpandido = this.getAttribute('aria-expanded') === 'true';
            
            if (estaExpandido) {
                // Recolher
                descricao.textContent = descricaoOriginal.substring(0, limiteCaracteres) + '...';
                this.innerHTML = '▼ Ver mais';
                this.setAttribute('aria-expanded', 'false');
                card.classList.remove('expandido');
            } else {
                // Expandir
                descricao.textContent = descricaoOriginal;
                this.innerHTML = '▲ Ver menos';
                this.setAttribute('aria-expanded', 'true');
                card.classList.add('expandido');
            }
        });
        
        // Inserir botão após o parágrafo
        descricao.parentNode.insertBefore(botaoExpandir, descricao.nextSibling);
    });
});
