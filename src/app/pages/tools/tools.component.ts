import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
declare var StripeCheckout: StripeCheckoutStatic;
declare var paypal;

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @ViewChild('paypal') paypalElement: ElementRef;

  @Input() amount;
  @Input() description;

  handler: StripeCheckoutHandler;
  confirmation: any;
  loading = false;

  product = {
    price: 1.00,
    description: 'Invitar a un café',
    img: '../../../assets/images/cup.svg'
  }
  paidFor = false;

  constructor() { }

  ngOnInit() {

    this.handler = StripeCheckout.configure({
      key: 'pk_test_E8u0J0rnhBdvGvdks2aogMTf00iFb28YPJ',
      image: '',
      locale: 'auto',
      source: async (source) => {
        this.loading = true;
        this.loading = false;
      }
    });

    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.product.description,
              amount: {
                currency_code: 'EUR',
                value: this.product.price
              }
            }
          ]
        });
      },
      onApprove : async (data, actions) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
      },
      onError: err =>{
        console.log(err);
        
      }
    })
    .render(this.paypalElement.nativeElement);
  }



  async checkout(e){
    this.handler.open({
      name: 'Pablo H. Martín',
      description: this.description,
      amount: this.amount,
    });
    e.preventDefaul();
  }

  @HostListener('window: popstate')
  onPopstate(){
    this.handler.close();
  }

}
