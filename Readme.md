# 🚀 Torresports - Site Profissional Completo (Versão Elite 2026)

Site estático de alta performance, otimizado para SEO Local, conversão, acessibilidade (WCAG) e conformidade estrita com a LGPD.

## 📁 Estrutura de Arquivos
- `index.html`: Página principal com Schema.org avançado (LocalBusiness, FAQPage, ItemList).
- `politica-privacidade.html`: Documento LGPD compliant, detalhando ferramentas de terceiros.
- `codigo-etica.html`: Diretrizes de conduta, foco em originalidade de suplementos.
- `style.css`: Estilos premium, modo escuro, animações GPU-accelerated e suporte a `safe-area` (iPhone).
- `script.js`: Lógica de UTM robusta, injeção condicional de scripts de marketing (LGPD real), e formulário com modal.

## ⚙️ Configuração Pré-Lançamento (CHECKLIST OBRIGATÓRIO)

1. **Substituir IDs de Marketing (Busque por "XXXXXXXX"):**
   - Abra `script.js`.
   - Substitua `G-XXXXXXXXXX` pelo seu ID do Google Analytics 4.
   - Substitua `AW-XXXXXXXXX` pelo seu ID de Conversão do Google Ads.
   - Substitua `1234567890` pelo seu ID do Meta Pixel.
   - *(Opcional)* Adicione o snippet do GTM se preferir gerenciar tudo por lá.

2. **Validar Links e Contatos:**
   - Confirme se o número de WhatsApp `5511989887743` está correto.
   - Verifique o e-mail `bruwilltorres@gmail.com` e o CPF/CNPJ no rodapé.

3. **Imagens:**
   - As imagens atuais são placeholders do Unsplash. Para produção, substitua os URLs por fotos reais dos seus produtos. **Mantenha os atributos `width` e `height`** para garantir pontuação 100 no Core Web Vitals (CLS).

## 🚀 Como Publicar (Hospedagem Estática Gratuita e Rápida)
1. Crie uma conta no **Netlify** ou **Vercel**.
2. Arraste a pasta contendo estes 6 arquivos para a área de "Drop" do painel.
3. O site estará no ar em segundos com HTTPS automático.
4. Configure seu domínio personalizado (`torresports.lojaintegrada.com.br` ou um domínio `.com.br` próprio) nas configurações da plataforma.

## 🧪 Testes Obrigatórios Antes de Lançar (QA)
- [ ] **Teste de UTM:** Abra o site adicionando `?utm_source=instagram&utm_campaign=promo` na URL. Clique em qualquer botão do WhatsApp. A mensagem pré-preenchida deve refletir essa origem.
- [ ] **Teste de LGPD Real:** Abra em aba anônima. Clique em "Rejeitar Não Essenciais". Abra o DevTools (F12) > Aba "Network" (Rede). Recarregue a página. Verifique se as requisições para `google-analytics.com` e `facebook.com/tr` **NÃO** aparecem.
- [ ] **Teste Mobile:** No DevTools (F12 > ícone de celular), verifique se a barra fixa inferior aparece, se o botão flutuante do WhatsApp sobe para não cobri-la, e se o menu hambúrguer funciona.
- [ ] **Teste de Formulário:** Preencha o formulário, recarregue a página (os dados devem persistir via `sessionStorage`). Envie o formulário e verifique se o modal de sucesso aparece e redireciona para o WhatsApp.
- [ ] **Teste de Acessibilidade:** Navegue pelo site usando apenas a tecla `TAB`. O foco deve ser claramente visível em todos os elementos interativos.