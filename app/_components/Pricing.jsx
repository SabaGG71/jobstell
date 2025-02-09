import Image from "next/image";
import checkbox from "../../public/checkbox.svg";
import { Button } from "../../components/ui/button";

export default function Pricing() {
  return (
    <section className="mb-[100px]">
      <div className="container content-center grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 items-center p-12 rounded-[40px] bg-gradient-to-b from-white to-primary-100">
        <div>
          <h4>Basic</h4>
          <div>
            <h4>5.99$</h4>
            <span>/ 100 Coins</span>
          </div>
          <div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Task creation and management</p>
            </div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Basic team collaboration tools</p>
            </div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Up to 5 projects</p>
            </div>
          </div>
          <div>
            <Button>Get Started Now</Button>
          </div>
        </div>
        <div>
          <h4>Pro</h4>
          <div>
            <h4>9.99$</h4>
            <span>/ 250 Coins</span>
          </div>
          <div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Unlimited projects</p>
            </div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Advanced task automation</p>
            </div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Team chat and file sharing</p>
            </div>
          </div>
          <div>
            <Button>Get Started Now</Button>
          </div>
        </div>
        <div>
          <h4>Ultimate</h4>
          <div>
            <h4>20$</h4>
            <span>/ 600 Coins</span>
          </div>
          <div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Customizable workflows</p>
            </div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Priority customer support</p>
            </div>
            <div>
              <Image src={checkbox} alt="check-svg" />
              <p>Comprehensive analytics</p>
            </div>
          </div>
          <div>
            <Button>Get Started Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
