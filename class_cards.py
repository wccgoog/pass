# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import random
class Card():
    def __init__(self,suit=0,rank=2):
        self.suit=suit
        self.rank=rank
    suit_names=['Clubs','Diamonds','Hearts','Spades']
    rank_names=[None,'Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King']
    def __str__(self):
        return '%s of %s'%(Card.rank_names[self.rank],Card.suit_names[self.suit])
    def __lt__(self,other):
        if self.suit<other.suit:
            return True
        if self.suit>other.suit:
            return False
        return self.rank<other.rank
    
    
    
class Deck():
    def __init__(self):
        self.cards=[]
        for suit in range(4):
            for rank in range(1,14):
                card=Card(suit,rank)
                self.cards.append(card)
    def __str__(self):
        res=[]
        for card in self.cards:
            res.append(str(card))
        return '\n'.join(res)
    def pop_card(self):
        return self.cards.pop()
    def add_card(self,card):
        self.cards.append(card)
    def shuffle(self):
        random.shuffle(self.cards)
    def sort(self):
        self.cards.sort()
    def move_cards(self,hand,num):
        for i in range(num):
            hand.add_card(self.pop_card())
    def deal_hands(self,hands_num,cards_num):
        hlist=[]
        for i in range(hands_num):
            h=PokerHand()
            self.move_cards(h,cards_num)
            hlist.append(h)
        return hlist

        
        
class Hand(Deck):
    def __init__(self,label=''):
        self.cards=[]
        self.label=label
        


class PokerHand(Hand):
    def suit_hist(self):
        self.suits={}
        for card in self.cards:
            self.suits[card.suit]=self.suits.get(card.suit,0)+1
    def has_flush(self):
        self.suit_hist()
        for val in self.suits.values():
            if val>=5:
                return True
        return False
    def rank_hist(self):
        self.ranks={}
        for card in self.cards:
            self.ranks[card.rank]=self.ranks.get(card.rank,0)+1
    def has_pair(self):
        self.rank_hist()
        for val in self.ranks.values():
            if val==2:
                return True
        return False
    def has_three(self):
        self.rank_hist()
        for val in self.ranks.values():
            if val==3:
                return True
        return False
    def find_five(self,rank,t):    
        for i in range(1,5):
            if rank+i not in t:
                return False
        return True 
    def has_straight(self):
        self.rank_hist()
        t=[]
        for key in self.ranks.keys():
            t.append(key)
        for rank in t:
            if self.find_five(rank,t):
                return True
        if 10 in t and 11 in t and 12 in t and 13 in t and 1 in t:
            return True
        return False               
    def has_twopair(self):
        self.rank_hist()
        count=0
        for val in self.ranks.values():
            if val==2:
                count+=1
        if count>=2:
            return True
        return False
    def has_four(self):
        self.rank_hist()
        for val in self.ranks.values():
            if val==4:
                return True
        return False
    def classify(self):
        if self.has_flush() and self.has_straight():
            self.label='straight flush'
        elif self.has_four():
            self.label='four of a kind'
        elif self.has_three() and self.has_pair():
            self.label='full house'
        elif self.has_flush():
            self.label='flush'
        elif self.has_straight():
            self.label='straight'
        elif self.has_three():
            self.label='three of a kind'
        elif self.has_twopair():
            self.label='twopair'
        elif self.has_pair():
            self.label='pair'
        else:
            self.label=None
def diff_cards_prob(n):
    diff={}
    for i in range(n):
        d=Deck()
        d.shuffle()
        t=d.deal_hands(5,5)
        for i in t:
            i.classify()
            diff[i.label]=diff.get(i.label,0)+1
    for i in diff:
        print(i,diff[i]/n)
    
diff_cards_prob(10000)

