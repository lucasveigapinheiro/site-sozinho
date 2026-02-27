// ==========================================
// Script Principal - Portfolio Lucas Veiga
// ==========================================

// ==========================================
// MENU FIXO E NAVEGAÇÃO
// ==========================================
const menu = document.getElementById('menu');
const menuLinks = document.querySelectorAll('#menu ul li a');
const sections = document.querySelectorAll('section');
let ultimaPosicao = 0;
let sectionDestacadaTimeout;

// Função para destacar section
function destacarSection(section) {
    // Remover destaque de todas as sections
    sections.forEach(s => s.classList.remove('destacada'));

    // Adicionar destaque à section clicada
    if (section) {
        section.classList.add('destacada');

        // Limpar timeout anterior
        if (sectionDestacadaTimeout) {
            clearTimeout(sectionDestacadaTimeout);
        }

        // Remover destaque após 3 segundos
        sectionDestacadaTimeout = setTimeout(() => {
            section.classList.remove('destacada');
        }, 3000);
    }
}

// Função para atualizar menu ativo baseado na seção visível
function atualizarMenuAtivo() {
    const posicaoAtual = window.scrollY + 100;

    sections.forEach((section, index) => {
        const topo = section.offsetTop;
        const altura = section.offsetHeight;
        const id = section.getAttribute('id');

        if (posicaoAtual >= topo && posicaoAtual < topo + altura) {
            menuLinks.forEach(link => link.classList.remove('ativo'));
            const linkAtivo = document.querySelector(`#menu ul li a[href="#${id}"]`);
            if (linkAtivo) {
                linkAtivo.classList.add('ativo');
            }
        }
    });
}

// Função para menu fixo
window.addEventListener('scroll', () => {
    const posicaoAtual = window.scrollY;

    if (posicaoAtual > 100) {
        menu.classList.add('menu-fixo');
    } else {
        menu.classList.remove('menu-fixo');
    }

    atualizarMenuAtivo();
    ultimaPosicao = posicaoAtual;
});

// Scroll suave para links do menu com destaque
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href');

        if (id === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Destacar primeira section
            destacarSection(sections[0]);
        } else {
            const section = document.querySelector(id);
            if (section) {
                const offsetTop = section.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });

                // Destacar section após um pequeno delay para o scroll completar
                setTimeout(() => {
                    destacarSection(section);
                }, 500);
            }
        }
    });
});

// Inicializar menu ativo no carregamento
window.addEventListener('load', atualizarMenuAtivo);

// ==========================================
// PROJETOS INTERATIVOS
// ==========================================
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

// ==========================================
// TOGGLE DE PROJETOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('toggleProjetos');
    const projetos = document.getElementById('listaProjetos');

    if (botao && projetos) {
        botao.addEventListener('click', () => {
            projetos.classList.toggle('ativo');
            botao.textContent = projetos.classList.contains('ativo') ? 'Ocultar projetos' : 'Ver projetos';
        });
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio Lucas Veiga - Carregado com sucesso! 🚀');
});
