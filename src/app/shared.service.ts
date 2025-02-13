import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface LogoDetail {
  id: number;
  name: string;
  originalPrice?: number;
  salePrice: number;
  image: string;
  description: string;
}

interface Emails {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private imageSource = new BehaviorSubject<string | null>(null);
  image$ = this.imageSource.asObservable();

  private sectionSource = new BehaviorSubject<string | null>(null);
  section$ = this.sectionSource.asObservable();

  updateImage(imageUrl: string) {
    this.imageSource.next(imageUrl);
  }

  updateSection(sectionString: string) {
    this.sectionSource.next(sectionString);
  }

  private defaultLogo: LogoDetail = {
    id: 0,
    name: '',
    originalPrice: 0,
    salePrice: 0,
    description: '',
    image: '',
  };

  private logoDetailSubject = new BehaviorSubject<LogoDetail>(this.defaultLogo);
  public logoDetail$: Observable<LogoDetail> =
    this.logoDetailSubject.asObservable();

  setLogoDetail(logo: LogoDetail): void {
    this.logoDetailSubject.next(logo);
  }

  getCurrentLogoDetail(): LogoDetail {
    return this.logoDetailSubject.getValue();
  }

  private allLogosArray: LogoDetail[] = [
    {
      id: 1,
      name: 'H for home',
      salePrice: 750.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 2,
      name: 'The Home Co',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Modern and stylish home solutions',
    },
    {
      id: 3,
      name: 'Home Styles',
      originalPrice: 1200.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Sophisticated furniture designs',
    },
    {
      id: 4,
      name: 'Interior Dream',
      originalPrice: 1100.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 5,
      name: 'Luxury Living',
      salePrice: 1200.0,
      image: 'Logos/logo.jpg',
      description: 'Elegant and luxurious interior decor',
    },
    {
      id: 6,
      name: 'Dream Decor',
      originalPrice: 1300.0,
      salePrice: 1050.0,
      image: 'Logos/logo.jpg',
      description: 'Perfect for transforming your home',
    },
    {
      id: 7,
      name: 'Urban Living',
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 8,
      name: 'Cosmic Interiors',
      originalPrice: 800.0,
      salePrice: 700.0,
      image: 'Logos/logo.jpg',
      description: 'Futuristic home designs',
    },
    {
      id: 9,
      name: 'Cozy Nest',
      salePrice: 600.0,
      image: 'Logos/logo.jpg',
      description: 'Warm and cozy living solutions',
    },
    {
      id: 10,
      name: 'Home Haven',
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'Create your dream space',
    },
    {
      id: 11,
      name: 'Furniture World',
      salePrice: 900.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 12,
      name: 'Cozy Living',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Comfortable and stylish home products',
    },
    {
      id: 13,
      name: 'Chic Interiors',
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: 'A touch of class for your home',
    },
    {
      id: 14,
      name: 'Fresh Interiors',
      salePrice: 750.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 15,
      name: 'Sleek Spaces',
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Minimalistic designs for modern homes',
    },
    {
      id: 16,
      name: 'Elegance Living',
      salePrice: 1100.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 17,
      name: 'Home Magic',
      salePrice: 1150.0,
      image: 'Logos/logo.jpg',
      description: 'Magical transformations for your space',
    },
    {
      id: 18,
      name: 'Modern Essentials',
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'Functional and trendy designs',
    },
    {
      id: 19,
      name: 'Urban Zen',
      salePrice: 700.0,
      image: 'Logos/logo.jpg',
      description: 'A zen atmosphere for your home',
    },
    {
      id: 20,
      name: 'Lavish Living',
      originalPrice: 1600.0,
      salePrice: 1300.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 21,
      name: 'Vibrant Vibes',
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'Brighten up your living space',
    },
    {
      id: 22,
      name: 'Sleek Living',
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Streamlined, modern furniture',
    },
    {
      id: 23,
      name: 'Charming Spaces',
      originalPrice: 900.0,
      salePrice: 700.0,
      image: 'Logos/logo.jpg',
      description: 'Stylish and inviting decor',
    },
    {
      id: 24,
      name: 'Zen Home',
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 25,
      name: 'Timeless Designs',
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'Elegance that lasts forever',
    },
    {
      id: 26,
      name: 'Classic Home',
      salePrice: 900.0,
      image: 'Logos/logo.jpg',
      description: 'Traditional and classic designs',
    },
    {
      id: 27,
      name: 'Urban Oasis',
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Create your own urban retreat',
    },
    {
      id: 28,
      name: 'Ethereal Interiors',
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 29,
      name: 'Cosmic Comfort',
      salePrice: 750.0,
      image: 'Logos/logo.jpg',
      description: 'Futuristic yet comfortable designs',
    },
    {
      id: 30,
      name: 'Serenity Home',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Create a peaceful home environment',
    },
    {
      id: 31,
      name: 'Timeless Interiors',
      salePrice: 900.0,
      image: 'Logos/logo.jpg',
      description: 'Elegant and everlasting designs',
    },
    {
      id: 32,
      name: 'Simplified Spaces',
      salePrice: 650.0,
      image: 'Logos/logo.jpg',
      description: 'Clean and simple designs',
    },
    {
      id: 33,
      name: 'The Living Room',
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 34,
      name: 'Creative Corners',
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Bringing creativity into your home',
    },
    {
      id: 35,
      name: 'Elegant Homes',
      originalPrice: 1300.0,
      salePrice: 1100.0,
      image: 'Logos/logo.jpg',
      description: 'Sophisticated home solutions',
    },
    {
      id: 36,
      name: 'Modern Escape',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 37,
      name: 'Furnish Co',
      originalPrice: 1100.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Furniture designed for comfort',
    },
    {
      id: 38,
      name: 'Pinnacle Living',
      originalPrice: 1400.0,
      salePrice: 1200.0,
      image: 'Logos/logo.jpg',
      description: 'Peak comfort for your home',
    },
    {
      id: 39,
      name: 'Classic Charm',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: 'Timeless charm for your home',
    },
    {
      id: 40,
      name: 'Comfy Spaces',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 41,
      name: 'Sunny Living',
      originalPrice: 800.0,
      salePrice: 650.0,
      image: 'Logos/logo.jpg',
      description: 'Bright and cheerful designs',
    },
    {
      id: 42,
      name: 'Eco Home',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'Sustainable living made easy',
    },
    {
      id: 43,
      name: 'Retro Style',
      originalPrice: 900.0,
      salePrice: 700.0,
      image: 'Logos/logo.jpg',
      description: 'Vintage designs with a modern twist',
    },
    {
      id: 44,
      name: 'Designer Dreams',
      originalPrice: 1500.0,
      salePrice: 1300.0,
      image: 'Logos/logo.jpg',
      description: 'Luxury and style combined',
    },
    {
      id: 45,
      name: 'Classic Living',
      originalPrice: 1100.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 46,
      name: 'Boho Home',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Bohemian flair for your home',
    },
    {
      id: 47,
      name: 'City Living',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: 'Urban living redefined',
    },
    {
      id: 48,
      name: 'Nature Inspired',
      originalPrice: 1100.0,
      salePrice: 900.0,
      image: 'Logos/logo.jpg',
      description: 'Bringing the outdoors inside',
    },
    {
      id: 49,
      name: 'Smart Living',
      originalPrice: 1300.0,
      salePrice: 1100.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 50,
      name: 'Pastel Dreams',
      originalPrice: 850.0,
      salePrice: 700.0,
      image: 'Logos/logo.jpg',
      description: 'Soft and calming colors for your home',
    },
    {
      id: 51,
      name: 'Clean Living',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Simple, clean design for modern homes',
    },
    {
      id: 52,
      name: 'Chic Urban',
      originalPrice: 1100.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Stylish solutions for city living',
    },
    {
      id: 53,
      name: 'Contemporary Living',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 54,
      name: 'Timeless Comfort',
      originalPrice: 1300.0,
      salePrice: 1100.0,
      image: 'Logos/logo.jpg',
      description: 'Comfort that transcends time',
    },
    {
      id: 55,
      name: 'Luxe Living',
      originalPrice: 1500.0,
      salePrice: 1300.0,
      image: 'Logos/logo.jpg',
      description: 'Luxury designs for the modern world',
    },
    {
      id: 56,
      name: 'Fresh Living',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'A fresh take on modern interiors',
    },
    {
      id: 57,
      name: 'Vintage Home',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 58,
      name: 'Pure Style',
      originalPrice: 900.0,
      salePrice: 750.0,
      image: 'Logos/logo.jpg',
      description: 'Minimalistic and pure design',
    },
    {
      id: 59,
      name: 'Nordic Living',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: 'Scandinavian simplicity for your home',
    },
    {
      id: 60,
      name: 'Compact Living',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Space-saving solutions for small homes',
    },
    {
      id: 61,
      name: 'Functional Decor',
      originalPrice: 850.0,
      salePrice: 700.0,
      image: 'Logos/logo.jpg',
      description: 'Style that serves a purpose',
    },
    {
      id: 62,
      name: 'Smart Design',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 63,
      name: 'Rustic Living',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Rustic charm for your home',
    },
    {
      id: 64,
      name: 'Trendy Living',
      originalPrice: 1100.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Stay on top of the latest design trends',
    },
    {
      id: 65,
      name: 'Maximalist Home',
      originalPrice: 1300.0,
      salePrice: 1100.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 66,
      name: 'Peaceful Retreat',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'A relaxing atmosphere for your space',
    },
    {
      id: 67,
      name: 'Creative Home',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: 'Think outside the box with home decor',
    },
    {
      id: 68,
      name: 'Bold Interiors',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Make a statement with your home',
    },
    {
      id: 69,
      name: 'Home Accent',
      originalPrice: 850.0,
      salePrice: 700.0,
      image: 'Logos/logo.jpg',
      description: 'Add a personal touch to your space',
    },
    {
      id: 70,
      name: 'Coastal Living',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 71,
      name: 'Refined Interiors',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: 'Sophistication for every room',
    },
    {
      id: 72,
      name: 'Funky Living',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Bring fun and creativity into your home',
    },
    {
      id: 73,
      name: 'Luxe Living',
      originalPrice: 1300.0,
      salePrice: 1100.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 74,
      name: 'Sustainable Design',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'Eco-friendly interiors for your home',
    },
    {
      id: 75,
      name: 'Earthy Elements',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Nature-inspired designs for your home',
    },
    {
      id: 76,
      name: 'Luxurious Living',
      originalPrice: 1500.0,
      salePrice: 1300.0,
      image: 'Logos/logo.jpg',
      description: 'Indulge in comfort and style',
    },
    {
      id: 77,
      name: 'Bohemian Chic',
      originalPrice: 1100.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 78,
      name: 'Country Comfort',
      originalPrice: 1000.0,
      salePrice: 850.0,
      image: 'Logos/logo.jpg',
      description: 'Warm and inviting country-style furniture',
    },
    {
      id: 79,
      name: 'Chic Minimalism',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Simplicity and elegance in every piece',
    },
    {
      id: 80,
      name: 'Bold Comfort',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 81,
      name: 'Vintage Charm',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: 'Vintage elegance for your home',
    },
    {
      id: 82,
      name: 'Coastal Comfort',
      originalPrice: 1100.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Relax and unwind in coastal style',
    },
    {
      id: 83,
      name: 'Elegant Spaces',
      originalPrice: 1200.0,
      salePrice: 1000.0,
      image: 'Logos/logo.jpg',
      description: 'Make your home truly elegant',
    },
    {
      id: 84,
      name: 'Modern Chic',
      originalPrice: 950.0,
      salePrice: 800.0,
      image: 'Logos/logo.jpg',
      description: '',
    },
    {
      id: 85,
      name: 'Scandi Style',
      originalPrice: 1100.0,
      salePrice: 950.0,
      image: 'Logos/logo.jpg',
      description: 'Clean lines and simple beauty',
    },
  ];

  private logoSource = new BehaviorSubject<LogoDetail[]>(this.allLogosArray);
  public allLogos$: Observable<LogoDetail[]> = this.logoSource.asObservable();

  getAllLogos(): LogoDetail[] {
    return this.logoSource.getValue();
  }

  addLogo(logo: LogoDetail): void {
    const newId =
      this.allLogosArray.length > 0
        ? Math.max(...this.allLogosArray.map((l) => l.id)) + 1
        : 1;

    const newLogo: LogoDetail = {
      ...logo,
      id: newId,
    };

    this.allLogosArray.push(newLogo);
    this.logoSource.next(this.allLogosArray);
  }

  deleteLogo(id: number): void {
    this.allLogosArray = this.allLogosArray.filter((logo) => logo.id !== id);
    this.logoSource.next(this.allLogosArray);
  }

  private allEmailsArray: Emails[] = [
    {
      id: 1,
      email: 'bilalsubhanii@outlook.com',
    },
    {
      id: 2,
      email: 'qasim.csengineer@gmail.com',
    },
  ];

  private emailSource = new BehaviorSubject<Emails[]>(this.allEmailsArray);
  public allEmails$: Observable<Emails[]> = this.emailSource.asObservable();

  getAllEmails(): Emails[] {
    return this.emailSource.getValue();
  }
  addEmail(email: string): void {
    const newId =
      this.allEmailsArray.length > 0
        ? Math.max(...this.allEmailsArray.map((e) => e.id)) + 1
        : 1;

    const newEmail: Emails = {
      id: newId,
      email: email,
    };

    this.allEmailsArray.push(newEmail);
    this.emailSource.next(this.allEmailsArray);
  }

  deleteEmail(id: number): void {
    this.allEmailsArray = this.allEmailsArray.filter(
      (email) => email.id !== id
    );
    this.emailSource.next(this.allEmailsArray);
  }
}
