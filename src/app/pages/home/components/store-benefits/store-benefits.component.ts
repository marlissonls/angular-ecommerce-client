import { Component } from '@angular/core'

@Component({
  selector: 'app-store-benefits',
  standalone: true,
  templateUrl: './store-benefits.component.html',
})
export class StoreBenefitsComponent {
  readonly benefits = [
    {
      number: '01',
      title: 'Compra segura',
      description: 'Seus dados protegidos em todas as etapas da compra.',
    },
    {
      number: '02',
      title: 'Pagamento facilitado',
      description: 'Condições práticas para você comprar com tranquilidade.',
    },
    {
      number: '03',
      title: 'Produtos selecionados',
      description: 'Equipamentos funcionais para diferentes necessidades.',
    },
    {
      number: '04',
      title: 'Suporte especializado',
      description: 'Atendimento para ajudar você a escolher seus equipamentos.',
    },
  ]
}