foo = ["i", "love", "to", "code"]

foo.map { |word| word.upcase }
# => ["I", "LOVE", "TO", "CODE"]

foo.map(&:upcase)
# => ["I", "LOVE", "TO", "CODE"]


upper = Proc.new { |word| word.upcase}
["i", "love", "to", "code"].map(&upper)
# => ["I", "LOVE", "TO", "CODE"]
["got", "asked", "out", "on", "april", "1st"].map(&upper)
# => ["GOT", "ASKED", "OUT", "ON", "APRIL", "1ST"]
["my", "armpit", "is", "a", "taco"].map(&upper)
# => ["MY", "ARMPIT", "IS", "A", "TACO"]


class Symbol
  def to_proc
    Proc.new { |obj, *args| obj.send(self, *args) }
  end
end

:upcase.to_proc
# => { |word| word.send(:upcase)}


[3, 2, 7, 5].inject { |sum, x| sum + x}
# => 17

[3, 2, 7, 5].inject(&:+)
# is equivalent to
[3, 2, 7, 5].inject { |sum, x| sum.send(:+, x)}


letter = "o"
foo.select { |word| word.include?(letter)}
# => ["love", "to", "code"]

#if only THIS could be done!
#foo.select(&:include?)  with letter passed as argument

#could this be possible?
#foo.select(&[:include?, letter])


Array.respond_to?(:to_proc)
# => false

class Array
  def to_proc
    method = self.shift
    args = self
    Proc.new { |x, *others| x.send(method, *(others + args))}
  end
end


stuff = [3, "corn", 6, 34, "gorilla", :four]
stuff.select(&[:is_a?, Integer])
# => [3, 6, 34]
stuff.select(&[:is_a?, String])
# => ["corn", "gorilla"]

letter = "t"
i_want_pets = ["I", "want", 3, "pets", "but", "only", "have", 2]
i_want_pets.map(&:to_s).select(&[:include?, letter])
# => ["want", "pets", "but"]

group_1 = [4.1, 5.5, 3.2, 3.3, 6.1, 3.9, 4.7]
group_1.reject(&[:<, 4])
# => [4.1, 5.5, 6.1, 4.7]



